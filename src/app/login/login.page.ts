import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserOptions } from '../interfaces/user-options';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  private login: UserOptions = { email: '', password: '' };
  private submitted = false;

  constructor(private request: RequestService,
              public router: Router) 
  {}


  /**
   * Make Login in API (or not)
   * @param form NgForm
   * @author Daniel Triboni
   * @returns route to Home
   */
  async onLogin(form: NgForm) 
  {
    this.submitted = true;
    if (form.valid) 
    {
      await this.request.presentLoader();
      let body = {
        "email": this.login.email,
        "password": this.login.password
      }
      await this.request.doLogin(body).then( result => {
        this.router.navigateByUrl('/countries');
      }).catch(async error => {
        /* We redirect to home too if the user is not signed up in API (workaround to challenge) */
        this.request.presentAlert('Credentials not found in our M30 API! But we redirect you to home...', ['OK']);
        this.router.navigateByUrl('/countries');
      })
      await this.request.dismissLoader();
    }
  }
}