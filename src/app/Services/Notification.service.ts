import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Notification } from "../Models/Notification";

/** Toast messages shown by <app-notification>. Also keeps a small history for the notifications page. */
@Injectable({
    providedIn:"root"
})
export class NotificationService{

    private toastSubject = new BehaviorSubject<Notification | null>(null);
    readonly toast$ = this.toastSubject.asObservable();

    history: Notification[] = [];
    private timer: any;

    show(message: string, colour: "alert-success" | "alert-danger" | "alert-info" = "alert-success", name = "toast"){
        const n = new Notification(name, message, colour);
        this.history.unshift(n);
        this.history = this.history.slice(0, 20);
        this.toastSubject.next(n);

        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.dismiss(), 4000);
        return n;
    }

    dismiss(){
        clearTimeout(this.timer);
        this.toastSubject.next(null);
    }
}
