import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class AuthService{

    /** Demo account (there is no backend yet). */
    readonly user:any ={
        name: "VIP User",
        username: "vipuser",
        password: "vip123",
        email: "vipuser@gmail.com",
        phone: 777070098,
        location: "12/c Old Galle Road, Horethuduwa, Panadura",
        country: "Sri Lanka",
        image: ""
    }

    private logged$ = new BehaviorSubject<boolean>(false);
    readonly isLogged$ = this.logged$.asObservable();

    get isLogged(): boolean {
        return this.logged$.value;
    }

    /** Returns the user on success, otherwise null. */
    login(username:string, password:string){
        if(username.trim().toLowerCase() === this.user.username && password === this.user.password){
            this.logged$.next(true);
            return this.user;
        }
        this.logged$.next(false);
        return null;
    }

    logOut(){
        this.logged$.next(false);
    }

    isAuthenticated(){
        return this.isLogged;
    }
}
