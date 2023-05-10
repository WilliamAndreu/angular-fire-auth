import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private userService:UserService
    ) {}

    publicRoutes = [
        '/',
        '/login',
        '/lobby',
        '/register',
        '/recover-password',
        '/terms',
        '/politics',
        '/offline-page'
    ];

    initialized: boolean = false;

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        // return true
        if (this.router.url == '/' && !this.initialized) {
            await this.userService.initialAuthValidation();
        }  
        return this.authorize(state);
    }

    //conprueba el state del user para activar el acceso a las rutas
    authorize(state: RouterStateSnapshot): boolean {
        //controla el beheaviour subject de userService (si es !=null autoriza la ruta)
        if (this.userService.user.value || this.publicRoutes.includes(state.url)) {
            if (this.router.url == '/' && !this.initialized) {
                this.initialized = true;
            }
            return this.authorized();
        }
        return this.unauthorized();
    }

    authorized(): boolean {
        return true;
    }

    unauthorized(): boolean {
        this.router.navigateByUrl('login');
        return false;
    }

}
