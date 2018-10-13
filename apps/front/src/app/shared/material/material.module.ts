import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSelectModule,
  MatRadioModule,
  MatSidenavModule,
  MatGridListModule,
  MatMenuModule,
  MatChipsModule,
} from '@angular/material';

const materialModules = [
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatListModule,
  MatProgressBarModule,
  MatSelectModule,
  MatRadioModule,
  MatSidenavModule,
  MatGridListModule,
  MatMenuModule,
  MatChipsModule,
];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MaterialModule {}
