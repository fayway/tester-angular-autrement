import { Component, OnDestroy, OnInit } from '@angular/core';
import { RentalsFacade } from '../+state/rentals.facade';
import { AuthFacade } from '../../auth/+state/auth.facade';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  takeUntil,
} from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  loading$ = this.rentalsFacade.loading$;
  rentals$ = this.rentalsFacade.allRentals$;
  loggedIn$ = this.authFacade.loggedIn$;

  searchControl = new FormControl();
  destroy$ = new Subject();

  constructor(
    private rentalsFacade: RentalsFacade,
    private authFacade: AuthFacade,
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        startWith(''),
      )
      .subscribe(city => {
        this.rentalsFacade.loadAll({ city });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
