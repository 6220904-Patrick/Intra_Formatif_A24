import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { inject } from "@angular/core";
import { UserService } from "./user.service";

export const animalGuard: CanActivateFn = (route, state) => {
  if (!inject(UserService).currentUser?.prefercat) {
    return createUrlTreeFromSnapshot(route, ['/dog']);
  }
  else return true;
};
