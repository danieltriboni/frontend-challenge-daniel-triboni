import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
})
export class CountriesPage implements OnInit {
  
  private countries: any = [];

  constructor(private activatedRoute: ActivatedRoute, 
              private request: RequestService) {}

  async ngOnInit() 
  {
    this.request.presentLoader();
    await this.getCountries();
  }


  /**
   * Get Countries
   * @param null
   * @author Daniel Triboni
   * @returns countries array
   */
  async getCountries()
  {
    await this.request.getCountries().then( result => {
      this.countries = result.countries;
    }).catch(async error => {
      alert(error.error.detail);
    })
    await this.request.dismissLoader();
  }
}