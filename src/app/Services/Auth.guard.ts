import { inject } from "@angular/core"
import { AuthService } from "./Auth.service"
import { Router } from "@angular/router";

export const CanActivate = ()=>{
    const authService = inject(AuthService);
    const router = inject(Router);

    if(authService.isAuthenticated()){
        return true;
    }else {
        alert("You should log first.")
        return false;
    }

}