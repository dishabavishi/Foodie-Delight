import { Component, ViewChild } from '@angular/core';
import { RestaurantService } from '../../services';
import { Restaurant } from '../../interfaces';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DomainConstants } from '../../../shared/constants/domain-constants';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrl: './restaurant-edit.component.scss'
})
export class RestaurantEditComponent {

  id: string = null;
  restaurant: Restaurant;
  maskedPhoneNumber = "+00 000 000 0000";
  cuisineTypes = DomainConstants.CuisineTypes;
  selectedCuisineTypes: string[] = [];
  @ViewChild('restaurantEditForm') restaurantEditForm: NgForm;

  constructor(private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.restaurant = restaurantService.newRestaurant();
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id == "0" ? null : id;
    this.cuisineTypes = this.cuisineTypes.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  }

  ngOnInit() {
    this.getRestaurantDetail();
  }

  getRestaurantDetail() {
    if (this.id) {
      this.spinner.show();
      this.restaurantService.get(this.id)
        .pipe(finalize(() => {
          this.spinner.hide();
        }))
        .subscribe({
          next: (res) => {
            this.restaurant = res;
            this.selectedCuisineTypes = this.restaurant.CuisineTypes ? this.restaurant.CuisineTypes.split(',') : [];
          }, error: (err) => {
            this.toastrService.error(err.error);
          }
        });
    }
  }

  saveDetails(isValid) {
    if (!isValid) {
      return;
    }
    this.restaurant.CuisineTypes = this.selectedCuisineTypes.join(',');
    this.spinner.show();
    this.restaurantService.insertOrUpdate(this.restaurant)
      .pipe(finalize(() => {
        this.spinner.hide();
      }))
      .subscribe({
        next: (res) => {
          this.toastrService.success('Restaurant saved.');
          this.cancel();
        }, error: (err) => this.toastrService.error(err)
      });
  }

  cancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
