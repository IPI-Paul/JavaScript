import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { BootstrapSamplesComponent } from './components/bootstrap-samples/bootstrap-samples.component';
import { IconExamplesComponent } from './components/icon-examples/icon-examples.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BootstrapCardComponent } from './components/bootstrap-card/bootstrap-card.component';
import { DataCardComponent } from './components/data-card/data-card.component';
import { EventsCardComponent } from './components/events-card/events-card.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ChangeUsernameComponent } from './components/change-username/change-username.component';
import { FormsCardComponent } from './components/forms-card/forms-card.component';
import { SmsAppComponent } from './components/sms-app/sms-app.component';
import { ShowPasswordComponent } from './components/show-password/show-password.component';
import { AmountRangeComponent } from './components/amount-range/amount-range.component';
import { ThemeComponent } from './components/theme/theme.component';
import { SanitizeHtmlPipePipe } from './pipes/sanitize-html-pipe.pipe';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { DirectivesCardComponent } from './components/directives-card/directives-card.component';
import { AuthUserComponent } from './components/auth-user/auth-user.component';
import { ShoppingCardComponent } from './components/shopping-card/shopping-card.component';
import { ProductComponent } from './components/product/product.component';
import { PipesCardComponent } from './components/pipes-card/pipes-card.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ContactAppComponent } from './components/contact-app/contact-app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { RouteBarComponent } from './components/route-bar/route-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    BootstrapSamplesComponent,
    IconExamplesComponent,
    NavbarComponent,
    BootstrapCardComponent,
    DataCardComponent,
    EventsCardComponent,
    ProductItemComponent,
    ShoppingCartComponent,
    ChangeUsernameComponent,
    FormsCardComponent,
    SmsAppComponent,
    ShowPasswordComponent,
    AmountRangeComponent,
    ThemeComponent,
    SanitizeHtmlPipePipe,
    UserRegisterComponent,
    DirectivesCardComponent,
    AuthUserComponent,
    ShoppingCardComponent,
    ProductComponent,
    PipesCardComponent,
    UserListComponent,
    ContactAppComponent,
    ContactListComponent,
    ContactCardComponent,
    HomeComponent,
    AboutComponent,
    CountryListComponent,
    CountryDetailsComponent,
    RouteBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
