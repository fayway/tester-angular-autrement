import { createComponent } from 'ngx-testing-library';

import { NavbarComponent } from './navbar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthFacade } from '../../auth/+state/auth.facade';

describe('NavbarComponent ngx-testing-library way', () => {

  it('should create', async () => {
    const { getByTestId  } = await createComponent(`<app-navbar></app-navbar>`, {
      declarations: [NavbarComponent],
      providers: [
        { provide: AuthFacade, useValue: jest.fn() }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    expect(getByTestId('company-name').textContent).toEqual('WaterBnb');
  });

});
