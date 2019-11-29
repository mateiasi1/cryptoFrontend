import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth-service";

@Injectable()
export class AuthGuard implements CanActivate{
constructor(private authService: AuthService, private router: Router) {}
routerState: boolean;
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
this.authService.isAuthenticated()
// .then(
// (authenticated: boolean) => {
// if (authenticated) {
//     this.routerState = true;
//     this.router.navigate(['/bank-account']);
//     return true;
// } else {
// this.router.navigate(['/login']);
// this.routerState = false;
// }
//         });
//        return this.routerState;
return true;
    }
}

// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
//     this.authService.isAuthenticated().then((authenticated: boolean) => {
//         if (!authenticated) {
//             this.router.navigate(['/login']);
//             return false;
//         }

//         return true;
//     });
//     return true;
// }