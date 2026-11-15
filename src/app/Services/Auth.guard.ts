import { inject } from "@angular/core"
import { AuthService } from "./Auth.service"
import { Router } from "@angular/router";

export const CanActivate = ()=>{
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAuthenticated() ? true : router.createUrlTree(['/sign-in']);
}
