import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducers } from './+state/auth.selectors';
import { AuthEffects } from './+state/auth.effects';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('auth', authReducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [LoginFormComponent, LoginPageComponent],
})
export class AuthModule {}
