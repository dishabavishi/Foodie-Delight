import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPencil, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { RestaurantService } from '../../services';
import { Restaurant } from '../../interfaces';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.scss'
})
export class RestaurantListComponent {

  restaurantsList: Array<Restaurant> = [];
  icons = {
    faPlus,
    faPencil,
    faTrashCan
  };

  constructor(private router: Router, private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.spinner.show();
    this.restaurantService.getAll()
      .pipe(finalize(() => {
        this.spinner.hide();
      }))
      .subscribe({
        next: (res) => {
          this.restaurantsList = res;
        }, error: (err) => this.toastrService.error(err)
      });
  }

  editRestaurant(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  showConfirmation(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(id);
      }
    });
  }

  delete(id: string) {
    this.spinner.show();
    this.restaurantService.delete(id)
      .pipe(finalize(() => {
        this.spinner.hide();
      }))
      .subscribe({
        next: (res) => {
          this.toastrService.success("Restaurant deleted.");
          this.getAll();
        }, error: (err) => this.toastrService.error(err)
      });
  }
}
