import { NgModule } from '@angular/core';
import { PriceCalculatorComponent } from './price-calculator/price-calculator.component';
import { SharedModule } from '../shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { DaysCalculatorPipe } from './days-calculator.pipe';

@NgModule({
  imports: [SharedModule, BsDatepickerModule.forRoot()],
  providers: [DaysCalculatorPipe],
  declarations: [PriceCalculatorComponent, DaysCalculatorPipe],
  exports: [PriceCalculatorComponent],
})
export class BookingModule {}
