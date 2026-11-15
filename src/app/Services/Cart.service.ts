import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { BehaviorSubject, map } from "rxjs";

export interface CartLine {
    id: number;
    qty: number;
}

const STORAGE_KEY = "freshora.cart";

@Injectable({providedIn:"root"})
export class CartService{

    private lines$ = new BehaviorSubject<CartLine[]>([]);

    /** Cart lines (id + quantity). Emits on every change. */
    readonly cart$ = this.lines$.asObservable();
    /** Total number of distinct products in the cart. */
    readonly count$ = this.lines$.pipe(map(lines => lines.length));

    constructor(@Inject(PLATFORM_ID) private platformId: object){
        this.lines$.next(this.read());
    }

    get lines(): CartLine[] {
        return this.lines$.value;
    }

    /** Product ids currently in the cart. */
    getIds(): number[] {
        return this.lines.map(l => l.id);
    }

    has(id: number): boolean {
        return this.lines.some(l => l.id === id);
    }

    add(id: number, qty = 1){
        if(this.has(id)){ return; }
        this.save([...this.lines, {id, qty}]);
    }

    setQty(id: number, qty: number){
        const safe = Math.min(Math.max(qty, 1), 99);
        this.save(this.lines.map(l => l.id === id ? {...l, qty: safe} : l));
    }

    remove(id: number){
        this.save(this.lines.filter(l => l.id !== id));
    }

    clear(){
        this.save([]);
    }

    private save(lines: CartLine[]){
        this.lines$.next(lines);
        if(isPlatformBrowser(this.platformId)){
            try{
                localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
            }catch{ /* storage unavailable (private mode / quota) */ }
        }
    }

    private read(): CartLine[] {
        if(!isPlatformBrowser(this.platformId)){ return []; }
        try{
            const raw = localStorage.getItem(STORAGE_KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed)
                ? parsed.filter(l => Number.isFinite(l?.id) && Number.isFinite(l?.qty))
                : [];
        }catch{
            return [];
        }
    }
}
