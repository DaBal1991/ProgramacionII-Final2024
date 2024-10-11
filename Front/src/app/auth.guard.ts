import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from "./_Servicio/login.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  const rolesPermitidos: String[] = route.data['rolesPermitidos'];
  const isConectado = loginService.isConectado();
  const rolUsuario = localStorage.getItem('rolUsuario');

  if(!isConectado) {
    router.navigate(['/accesoRestringido'])
    return false;
  }

  if(rolUsuario && rolesPermitidos.includes(rolUsuario)) {
    return true;
  } else {
    router.navigate(['/accesoRestringido']);
    return false;
  }

};
