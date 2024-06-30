import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../shared/services/base-crud.service';
import { Restaurant } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService extends BaseCrudService<Restaurant> {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.apiEndpoint = `${this.apiEndpoint}restaurant`;
  }

  newRestaurant(): Restaurant {
    return {
      Id: null,
      Name: '',
      Location: '',
      Description: '',
      ContactNumber: '',
      CuisineTypes: '',
      WebsiteURL: ''
    };
  }
}
