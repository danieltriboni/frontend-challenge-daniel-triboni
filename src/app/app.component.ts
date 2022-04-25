import { Component } from '@angular/core';
import { RequestService } from './services/request.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public dark = false;

  public appPages = [
    { title: 'Countries', url: '/countries', icon: 'globe' },
    { title: 'Logout', url: '/login', icon: 'log-out' }
   ];
  constructor() {}
}