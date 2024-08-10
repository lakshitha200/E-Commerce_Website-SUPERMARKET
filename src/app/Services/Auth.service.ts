import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class AuthService{

    user:any ={
        name: "VIP User",
        username: "vipuser",
        password: "vip123",
        email: "vipuser@gmail.com",
        phone: 777070098,
        location: "12/c Old Galle Road, Horethuduwa, Panadura",
        country: "Sri Lanka",
        image: ""
    }

    isLogged:boolean = false;

    login(username:string, password:string){
        if(username == this.user.username && password == this.user.password){
            this.isLogged == true;
        }else{
            this.isLogged == false;
        }
        return this.user;
    }

    logOut(){
        this.isLogged == false;
    }

    isAuthenticated(){
        return this.isLogged;
    }
}