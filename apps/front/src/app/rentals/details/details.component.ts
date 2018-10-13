import { Component, OnInit } from '@angular/core';
import { RentalsFacade } from '../+state/rentals.facade';
import { Observable } from 'rxjs';
import { Rental } from '../rentals.models';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  rental$: Observable<Rental>;

  constructor(
    private rentalsFacade: RentalsFacade,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.rental$ = this.route.params.pipe(
      map(params => +params['id']),
      switchMap(id => {
        return this.rentalsFacade.selectedRental$(id);
      }),
    );
  }
}
