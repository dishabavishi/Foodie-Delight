import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WebApp';

  constructor(private router: Router) {}

  ngOnInit() {
  }
  
  viewRestaurants() {
    this.router.navigate(["admin/restaurants"]);
  }
}
