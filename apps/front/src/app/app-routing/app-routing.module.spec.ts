import { AppRoutingModule, routes } from './app-routing.module';
import { Route } from '@angular/router';

expect.addSnapshotSerializer({
  test: (confRoutes: Route[]) => {
    const isRoot = (object: any): object is Route => {
      return 'path' in object;
    };
    return confRoutes.reduce((acc, curr) => acc && isRoot(curr), true);
  },
  print: (confRoutes: Route[]) => {
    let str = 'Routes: [ \n';
    str += confRoutes.map((route) => {
      return `   Route: {
            path: ${route.path},
            component: ${route.component ? route.component.prototype.constructor.name : undefined},
            redirectTo: ${route.redirectTo},
            pathMatch: ${route.pathMatch},
            canActivate: ${route.canActivate ? route.canActivate.map((guard) => {
        return guard.prototype.constructor.name;
      }).join(',') : undefined}
          }\n`;
    });
    str += ']';
    return str;
  }
});

describe('AppRoutingModule', () => {
  let routingModule: AppRoutingModule;

  beforeEach(() => {
    routingModule = new AppRoutingModule();
  });

  it('should create an instance', () => {
    expect(routingModule).toBeTruthy();
  });

  it('should contains correct routes/guards', () => {
    expect(routes).toMatchSnapshot();
  });

});
