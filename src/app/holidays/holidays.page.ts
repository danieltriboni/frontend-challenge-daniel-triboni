import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../services/request.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.page.html',
  styleUrls: ['./holidays.page.scss'],
})
export class HolidaysPage implements OnInit {

  private country: any;
  private holidays: any = [];

  constructor(private activatedRoute: ActivatedRoute, 
              private request: RequestService,
              private location: Location) 
  {}

  async ngOnInit() 
  {
    this.request.presentLoader();
    this.country = this.activatedRoute.snapshot.paramMap.get('id');
    await this.getHolidays(this.country);
  }

  
  /**
   * Get Holidays
   * @param country Code
   * @author Daniel Triboni
   * @returns holidays array
   */
  async getHolidays(country: any)
  {
    let body = {
      "country_code": country,
      "year": 2022
    }
    await this.request.getHolidays(body).then((result:any) => {
      this.holidays = result.holidays;
    }).catch(async error => {
      alert(error.error.detail);
      this.location.back();
    })
    await this.request.dismissLoader();
  }
}