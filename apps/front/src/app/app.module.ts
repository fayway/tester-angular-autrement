import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShellRootComponent } from './shell/root/shell-root.component';
import { ShellModule } from './shell/shell.module';
import { RentalsModule } from './rentals/rentals.module';
import { AuthInterceptor } from './auth/auth.interceptor';

registerLocaleData(localeFr);

@NgModule({
  imports: [
    CoreModule,
    AppRoutingModule,
    ShellModule,
    RentalsModule,
    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [ShellRootComponent],
})
export class AppModule {}
