import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'My First Angular App!';

  authen = false;
  token = '';
  error: any = {}

  constructor(private router: Router) { }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  navi(link) {
    this.router.navigate(['/' + link]);
  }

  login() {
    console.log('token' + this.token)
    if (this.token) {
      this.router.navigate(['/order']);
      this.authen = true;
      sessionStorage.setItem('Bear', 'Bear ');
    } else {
      this.error.accessDenied = true
    }
  }
}
