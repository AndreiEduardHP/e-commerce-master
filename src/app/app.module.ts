import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DefaultScreenComponent } from './views/default-screen/default-screen.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './components/logo/logo.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { LoginScreenComponent } from './views/login-screen/login-screen.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RightsComponent } from './shared/rights/rights.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignUpScreenComponent } from './views/sign-up-screen/sign-up-screen.component';
import { ConfidentialitateComponent } from './views/confidentialitate/confidentialitate.component';
import { IstoricComenziComponent } from './components/istoric-comenzi/istoric-comenzi.component';
import { InformatiiPersonaleComponent } from './components/informatii-personale/informatii-personale.component';
import { ReseteazaParolaComponent } from './components/reseteaza-parola/reseteaza-parola.component';
import { ProduseComponent } from './components/produse/produse.component';
import { AdministrareComponent } from './components/administrare/administrare.component';
import { CartComponent } from './components/cart/cart.component';
import { AdaugaProdusComponent } from './components/adauga-produs/adauga-produs.component';
import { ShowRoleComponent } from './components/show-role/show-role.component';
import { AdaugaAdresaLivrareComponent } from './components/adauga-adresa-livrare/adauga-adresa-livrare.component';
import { FinalizeazaComandaComponent } from './components/finalizeaza-comanda/finalizeaza-comanda.component';
import { EditAddressModalComponent } from './modals/edit-address-modal/edit-address-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderDetailsModalComponent } from './modals/order-details-modal/order-details-modal.component';
import { ProduseleMeleComponent } from './components/produsele-mele/produsele-mele.component';
import { EditProductModalComponent } from './modals/edit-product-modal/edit-product-modal.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { ProductDetailsModalComponent } from './modals/product-details-modal/product-details-modal.component';
import { ResetPasswordModalComponent } from './modals/reset-password-modal/reset-password-modal.component';
import { AdaugaAdresaModalComponent } from './modals/adauga-adresa-modal/adauga-adresa-modal.component';
import { ConfirmDeleteAddressComponent } from './modals/confirm-delete-address/confirm-delete-address.component';
import { ProducatoriComponent } from './components/producatori/producatori.component';
import { UpdateStatusFurnizorComponent } from './modals/update-status-furnizor/update-status-furnizor.component';
import { MonthlyLimitComponent } from './components/monthly-limit/monthly-limit.component';
import { EditMonthlyLimitComponent } from './modals/edit-monthly-limit/edit-monthly-limit.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultScreenComponent,
    LoginFormComponent,
    LogoComponent,
    NewsletterComponent,
    LoginScreenComponent,
    NavbarComponent,
    FooterComponent,
    RightsComponent,
    NotificationComponent,
    SignUpFormComponent,
    SignUpScreenComponent,
    ConfidentialitateComponent,
    IstoricComenziComponent,
    InformatiiPersonaleComponent,
    ReseteazaParolaComponent,
    ProduseComponent,
    AdministrareComponent,
    CartComponent,
    AdaugaProdusComponent,
    ShowRoleComponent,
    AdaugaAdresaLivrareComponent,
    FinalizeazaComandaComponent,
    EditAddressModalComponent,
    OrderDetailsModalComponent,
    ProduseleMeleComponent,
    EditProductModalComponent,
    ClientiComponent,
    ProductDetailsModalComponent,
    ResetPasswordModalComponent,
    AdaugaAdresaModalComponent,
    ConfirmDeleteAddressComponent,
    ProducatoriComponent,
    UpdateStatusFurnizorComponent,
    MonthlyLimitComponent,
    EditMonthlyLimitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
