import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RentalsFacade } from '../+state/rentals.facade';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DetailsGuard implements CanActivate {
  constructor(private rentalsFacade: RentalsFacade, private router: Router) {}

  canActivate(
    nextRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const id = +nextRoute.params['id'];
    if (!id) {
      return false;
    }
    return this.rentalsFacade.allRentals$.pipe(
      tap(rentals => {
        if (!rentals || !rentals.length) {
          this.rentalsFacade.loadOne(id);
        }
      }),
      filter(rentals => rentals && rentals.length > 0),
      switchMap(rentals => {
        if (!rentals.find(rental => rental.id === id)) {
          this.router.navigate(['/rentals']);
          return of(false);
        }
        return of(true);
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/rentals']);
        return of(false);
      }),
    );
  }
}
