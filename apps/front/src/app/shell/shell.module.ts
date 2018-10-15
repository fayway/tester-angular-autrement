import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { ShellRootComponent } from './root/shell-root.component';
import { SharedModule } from '../shared/shared.module';
import { NotfoundPageComponent } from './pages/404/notfound-page.component';
import { TestComponent } from './test/test.component';

@NgModule({
  imports: [SharedModule],
  declarations: [NavbarComponent, ShellRootComponent, NotfoundPageComponent, TestComponent],
})
export class ShellModule {}
