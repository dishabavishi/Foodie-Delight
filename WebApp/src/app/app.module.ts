import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantListComponent } from './admin/components/restaurant-list/restaurant-list.component';
import { RestaurantEditComponent } from './admin/components/restaurant-edit/restaurant-edit.component';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PhoneMaskPipe } from './shared/pipes/phone-mask.pipe';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    RestaurantEditComponent,
    NotFoundComponent,
    PhoneMaskPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgSelectModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-atom' }),
    SweetAlert2Module.forRoot()
  ],
  providers: [NgxMaskPipe, provideEnvironmentNgxMask(options)],
  bootstrap: [AppComponent]
})
export class AppModule { }
