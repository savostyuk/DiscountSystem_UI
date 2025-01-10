import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { RoleService } from '../../../services/role-service/role.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const router = inject(Router);
  const roleService = inject(RoleService);
  const userRole = roleService.getRole();
  const rolesRoute = route.data['roles'] as string[];

  if (!rolesRoute || rolesRoute.length === 0) {
    router.navigate(['/discounts']);
    return false;
  }

  if (rolesRoute.includes(userRole.toLowerCase())) {
    return true;
  } else {
    router.navigate(['/discounts']);

    return false;
  }
};
