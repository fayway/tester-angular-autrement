import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { concatMap, map, startWith, tap } from 'rxjs/operators';
import { Rental } from '../../rentals/rentals.models';
import { BookingService } from '../booking.service';
import { DiscountType, PriceSimulator } from '../booking.models';
import { DaysCalculatorPipe } from '../days-calculator.pipe';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.scss'],
})
export class PriceCalculatorComponent implements OnInit {
  @Input() rental: Rental;

  priceSimulator$: Observable<PriceSimulator>;

  period: FormControl;
  minDate = new Date();
  discountType = DiscountType;
  loading = false;

  jourPluralMapping: { [k: string]: string } = {
    '=0': 'Aucun jour',
    '=1': '1 jour',
    other: '# jours',
  };

  constructor(
    private bookingService: BookingService,
    private daysCalculatorPipe: DaysCalculatorPipe,
    private fb: FormBuilder,
  ) {
    this.period = this.fb.control([]);
  }

  ngOnInit() {
    this.priceSimulator$ = this.period.valueChanges.pipe(
      startWith([]),
      tap(() => (this.loading = true)),
      concatMap(dates => {
        if (!dates || !dates.length) {
          return of([]);
        }
        const [startDate, endDate] = dates;
        return this.bookingService.getDiscount({
          idRental: this.rental.id,
          startDate,
          endDate,
        });
      }),
      map(discounts => {
        return new PriceSimulator(
          this.rental.price,
          this.daysCalculatorPipe.transform(this.period.value),
          discounts,
        );
      }),
      tap(() => (this.loading = false)),
    );
  }
}
