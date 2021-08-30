import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { NaviComponent } from './components/navi/navi.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';

import {ToastrModule} from "ngx-toastr";
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { FilterCategoryPipe } from './pipes/filter-category.pipe';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductAddModalPopupComponent } from './components/product-add-modal-popup/product-add-modal-popup.component';
import { ProductUpdateModalPopupComponent } from './components/product-update-modal-popup/product-update-modal-popup.component';
import { CategoryAddModalPopupComponent } from './components/category-add-modal-popup/category-add-modal-popup.component';
import { CategoryUpdateModalPopupComponent } from './components/category-update-modal-popup/category-update-modal-popup.component';
import { CategoryDeleteModalPopupComponent } from './components/category-delete-modal-popup/category-delete-modal-popup.component';
import { ProductDeleteModalPopupComponent } from './components/product-delete-modal-popup/product-delete-modal-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    NaviComponent,
    VatAddedPipe,
    LoginComponent,
    CategoryFilterComponent,
    FilterCategoryPipe,
    FilterProductPipe,
    ProductAddModalPopupComponent,
    ProductUpdateModalPopupComponent,
    CategoryAddModalPopupComponent,
    CategoryUpdateModalPopupComponent,
    CategoryDeleteModalPopupComponent,
    ProductDeleteModalPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
