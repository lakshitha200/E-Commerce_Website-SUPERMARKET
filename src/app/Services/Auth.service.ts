import { afterNextRender, Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { BehaviorSubject, map } from "rxjs";

export interface AppUser {
    name: string;
    username: string;
    email: string;
    phone: string;
    location: string;
    country: string;
    image: string;
}

export interface RegisterData {
    name: string;
    username: string;
    email: string;
    phone: string;
    location: string;
    password: string;
}

interface StoredUser extends AppUser {
    salt: string;
    hash: string;
}

const USERS_KEY = "freshora.users";
const SESSION_KEY = "freshora.session";

/**
 * Front-end only authentication (there is no backend yet).
 * Accounts live in this browser's localStorage and passwords are stored as a salted
 * SHA-256 hash. This is fine for a demo, but real apps must authenticate on a server.
 */
@Injectable({
    providedIn:"root"
})
export class AuthService{

    /** Demo account that always works. */
    private readonly demo = {
        name: "VIP User",
        username: "vipuser",
        password: "vip123",
        email: "vipuser@gmail.com",
        phone: "0777070098",
        location: "12/c Old Galle Road, Horethuduwa, Panadura",
        country: "Sri Lanka",
        image: ""
    };

    private state$ = new BehaviorSubject<AppUser | null>(null);
    readonly user$ = this.state$.asObservable();
    /** Emits false until the browser has restored the saved session, so server and client HTML match. */
    readonly isLogged$ = this.state$.pipe(map(u => !!u));

    constructor(@Inject(PLATFORM_ID) private platformId: object){
        afterNextRender(() => {
            const u = this.readSession();
            if(u){ this.state$.next(u); }
        });
    }

    /** The signed-in user (read from storage if the page was just loaded). */
    get currentUser(): AppUser | null {
        return this.state$.value ?? this.readSession();
    }

    get isLogged(): boolean {
        return !!this.currentUser;
    }

    isAuthenticated(): boolean {
        return this.isLogged;
    }

    /** Returns the user on success, otherwise null. */
    async login(username: string, password: string): Promise<AppUser | null> {
        const name = username.trim().toLowerCase();
        let user: AppUser | null = null;

        if(name === this.demo.username && password === this.demo.password){
            user = this.publicUser(this.demo);
        }else{
            const stored = this.readUsers().find(u => u.username.toLowerCase() === name);
            if(stored && await this.hash(password, stored.salt) === stored.hash){
                user = this.publicUser(stored);
            }
        }

        if(user){
            this.writeSession(user.username);
            this.state$.next(user);
        }
        return user;
    }

    async register(data: RegisterData): Promise<{ ok: true } | { ok: false; error: string }> {
        const username = data.username.trim();
        const email = data.email.trim().toLowerCase();
        const users = this.readUsers();

        if(username.toLowerCase() === this.demo.username || users.some(u => u.username.toLowerCase() === username.toLowerCase())){
            return { ok: false, error: 'That username is already taken.' };
        }
        if(email === this.demo.email || users.some(u => u.email.toLowerCase() === email)){
            return { ok: false, error: 'An account with that email already exists.' };
        }

        try{
            const salt = this.randomSalt();
            const hash = await this.hash(data.password, salt);
            users.push({
                name: data.name.trim(), username, email, phone: data.phone.trim(),
                location: data.location.trim(), country: 'Sri Lanka', image: '', salt, hash
            });
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
            return { ok: true };
        }catch{
            return { ok: false, error: 'Could not create the account in this browser. Please use a secure (https) connection.' };
        }
    }

    logOut(){
        if(isPlatformBrowser(this.platformId)){
            try{ localStorage.removeItem(SESSION_KEY); }catch{ /* ignore */ }
        }
        this.state$.next(null);
    }

    // ---------- helpers ----------

    private publicUser(u: AppUser): AppUser {
        const { name, username, email, phone, location, country, image } = u;
        return { name, username, email, phone, location, country, image };
    }

    private readUsers(): StoredUser[] {
        if(!isPlatformBrowser(this.platformId)){ return []; }
        try{
            const raw = JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]');
            return Array.isArray(raw) ? raw : [];
        }catch{
            return [];
        }
    }

    private readSession(): AppUser | null {
        if(!isPlatformBrowser(this.platformId)){ return null; }
        try{
            const username = localStorage.getItem(SESSION_KEY);
            if(!username){ return null; }
            if(username === this.demo.username){ return this.publicUser(this.demo); }
            const stored = this.readUsers().find(u => u.username === username);
            return stored ? this.publicUser(stored) : null;
        }catch{
            return null;
        }
    }

    private writeSession(username: string){
        try{ localStorage.setItem(SESSION_KEY, username); }catch{ /* storage unavailable */ }
    }

    private randomSalt(): string {
        const bytes = crypto.getRandomValues(new Uint8Array(16));
        return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    private async hash(password: string, salt: string): Promise<string> {
        if(!crypto?.subtle){ throw new Error('Secure context required'); }
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + password));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
}
