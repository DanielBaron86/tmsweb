import { ResolveFn,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import {toObservable} from '@angular/core/rxjs-interop';
import {filter, first} from 'rxjs';
import {UserResource} from '../models/user-models';
import {UserService} from '../services/users/user-service';

 export const UserResolver : ResolveFn<UserResource> = (
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot,
 ) => {
     const goodsService = inject(UserService)
     const baseId = parseInt(route.paramMap.get('id')!);
     return toObservable(goodsService.getUserById(baseId).value).pipe(
     filter(val => val !== undefined),
     first()
   );
 }
