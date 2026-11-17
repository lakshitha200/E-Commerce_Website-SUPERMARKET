import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./Auth.service";
import { NotificationService } from "./Notification.service";

/** Only signed-in users may open the route; guests are sent to sign in and then returned here. */
export const CanActivate: CanActivateFn = (_route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const notifications = inject(NotificationService);
    const browser = isPlatformBrowser(inject(PLATFORM_ID));

    if(auth.isAuthenticated()){
        return true;
    }
    if(browser){
        notifications.show('Please sign in to continue.', 'alert-info');
    }
    return router.createUrlTree(['/sign-in'], { queryParams: { returnUrl: state.url } });
};

/** Sign in / sign up pages are only for guests; signed-in users go to their profile. */
export const GuestOnly: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.isAuthenticated() ? router.createUrlTree(['/profile']) : true;
};
