import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { RoleService } from '../../../services/role-service/role.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

    const router = inject(Router);
    const roleService = inject(RoleService);
    const role = roleService.getRole();

    if (role.toLowerCase() === route.data['role']) {

        return true;
    } else {
        router.navigate(['/discounts']);

        return false;
    }
};
