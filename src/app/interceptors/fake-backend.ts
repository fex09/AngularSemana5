import { Credentials } from './../models/credenetials';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

const users = [
  {
    id: 1,
    email: 'fsolisg@gmail.com',
    password: 'contrasena',
    firstname: 'Fénix',
    lastname: 'Solis'
  },
  {
    id: 2,
    email: 'jperez@gmail.com',
    password: 'contrasena',
    firstname: 'Juan',
    lastname: 'Perez'
  }
];


export class FakeBackEndInterceptor implements HttpInterceptor {
  isLoggedIn = false;

  intercept(request: HttpRequest<any>, next: HttpHandler): import('rxjs').Observable<HttpEvent<any>> {
    this.isLoggedIn = request.headers.get('Authorization') === 'Bearer this-is-a-jwt';

    switch (true) {
      case request.url.endsWith('/api/users') && request.method === 'GET':
        return this.getUsers();
      case request.url.endsWith('/api/login') && request.method === 'POST':
        return this.login(request.body);
      default:
        next.handle(request);
    }
  }

  login(credentials: Credentials) {
    const user = users.find(x => x.email === credentials.email && x.password === credentials.password);
    if (!user) {
      return this.error('Invalid credentials!');
    }
    return this.ok({
      token: 'this-is-a-jwt'
    });
  }

  getUsers() {
    if (this.isLoggedIn) {
      return this.ok(users);
    } else {
      this.unauthorized();
    }
  }

  // Helper functions

  ok(body?) {
    return of(new HttpResponse({ status: 200, body })).pipe(delay(1000));
  }

  error(message) {
    return throwError({ error: { message } }).pipe(delay(1000));
  }

  unauthorized() {
    return throwError({ status: 401, error: { message: 'Unauthorized' } }).pipe(delay(1000));
  }


}
