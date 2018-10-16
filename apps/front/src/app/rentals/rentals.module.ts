import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { initialState as rentalsInitialState, rentalsReducer } from './+state/rentals.reducer';
import { RentalsEffects } from './+state/rentals.effects';
import { BookingModule } from '../booking/booking.module';

@NgModule({
  imports: [
    SharedModule,
    BookingModule,
    StoreModule.forFeature('rentals', rentalsReducer, {
      initialState: rentalsInitialState,
    }),
    EffectsModule.forFeature([RentalsEffects]),
  ],
  declarations: [ListComponent, DetailsComponent],

})
export class RentalsModule {}
