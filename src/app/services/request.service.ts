import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController, Platform, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private httpOption: any;
  private loading: any;

  constructor(private http: HttpClient,
              private loader: LoadingController,
              private alert: AlertController,
              private platform: Platform) 
  { 
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${environment.$M3O_API_TOKEN}`
      }) 
    };
  }


  /**
   * Get Countries in M30 API
   * @param none
   * @author Daniel Triboni
   * @returns API json results
   */
  public getCountries(): Promise<any>
  {
    return new Promise((resolve, reject) => { 
      this.http.get(`${environment.$M30_URL}/holidays/Countries`, this.httpOption)
      .subscribe(res => resolve(res), 
                error => reject(error));
    });
  }


  /**
   * Get Country`s Holiday based on country Code and current year
   * @param none
   * @author Daniel Triboni
   * @returns API json results
   */
  public getHolidays(body: any)
  {
    return new Promise((resolve, reject) => { 
      this.http.post(`${environment.$M30_URL}/holidays/List`, body, this.httpOption )
      .subscribe(res => resolve(res), 
                error => reject(error));
    });
  }


  /**
   * Make login in M30 API for user signed up - 
   * NOTE: This method aways returns true.
   * @param none
   * @author Daniel Triboni
   * @returns API json results
   */
  public doLogin(body: any)
  {
    return new Promise((resolve, reject) => { 
      this.http.post(`${environment.$M30_URL}/user/Login`, body, this.httpOption )
      .subscribe(res => resolve(res), 
                error => reject(error));
    });
  }


  /**
   * Show Loader Controller
   * @param none
   * @author Daniel Triboni
   */
  public async presentLoader() 
  {
    this.loading = await this.loader.create({
      message: 'Please wait...',
      backdropDismiss: false
    });
    await this.loading.present();
  }


  /**
   * Hide Loader Controller
   * @param none
   * @author Daniel Triboni
   */
  public async dismissLoader()
  {
    await this.loading.dismiss();
  }


  /**
   * Show Alert Controller
   * @param msg string, 
   * @param arrButtons array of buttons for confirm or single alert
   * @author Daniel Triboni
   */
  async presentAlert(msg: string = null, arrButtons: any) 
  {
    return new Promise(async (resolve) => {
      let arrBtns = [{text: arrButtons[0], handler: data => resolve(true)},
                     {text: arrButtons[1], handler: data => resolve(false)}];
      if (arrButtons.length == 1)
        arrBtns.pop();
      let alertc = await this.alert.create({
        header: `Attention`,
        mode: (this.platform.is('ios') ? 'ios' : 'md'),
        message: msg,
        buttons: arrBtns,
        backdropDismiss: false
      });
      await alertc.present();
    });
  }
}