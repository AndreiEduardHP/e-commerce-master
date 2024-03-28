import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DefaultScreenComponent } from './views/default-screen/default-screen.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginScreenComponent } from './views/login-screen/login-screen.component';
import { SignUpScreenComponent } from './views/sign-up-screen/sign-up-screen.component';
import { ConfidentialitateComponent } from './views/confidentialitate/confidentialitate.component';
import { FinalizeazaComandaComponent } from './components/finalizeaza-comanda/finalizeaza-comanda.component';
import { ProduseleMeleComponent } from './components/produsele-mele/produsele-mele.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { AdaugaAdresaLivrareComponent } from './components/adauga-adresa-livrare/adauga-adresa-livrare.component';
import { ShowRoleComponent } from './components/show-role/show-role.component';
import { AdaugaProdusComponent } from './components/adauga-produs/adauga-produs.component';
import { CartComponent } from './components/cart/cart.component';
import { AdministrareComponent } from './components/administrare/administrare.component';
import { ProduseComponent } from './components/produse/produse.component';
import { ReseteazaParolaComponent } from './components/reseteaza-parola/reseteaza-parola.component';
import { InformatiiPersonaleComponent } from './components/informatii-personale/informatii-personale.component';
import { IstoricComenziComponent } from './components/istoric-comenzi/istoric-comenzi.component';

const routes: Routes = [
  {
    path: '',
    component: LoginScreenComponent,
  },
  {
    path: 'default-screen',
    component: DefaultScreenComponent,
  },
  {
    path: 'login-screen',
    component: LoginScreenComponent,
  },
  {
    path: 'confidentialitate-screen',
    component: ConfidentialitateComponent,
  },
  {
    path: 'sign-up-screen',
    component: SignUpScreenComponent,
  },
  {
    path: 'istoric',
    component: IstoricComenziComponent,
  },
  {
    path: 'informatiiPersonale',
    component: InformatiiPersonaleComponent,
  },
  {
    path: 'reseteazaParola',
    component: ReseteazaParolaComponent,
  },
  {
    path: 'produse',
    component: ProduseComponent,
  },
  {
    path: 'administrare',
    component: AdministrareComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'adaugaProdus',
    component: AdaugaProdusComponent,
  },
  {
    path: 'showRol',
    component: ShowRoleComponent,
  },
  {
    path: 'adaugaAdresa',
    component: AdaugaAdresaLivrareComponent,
  },
  {
    path: 'finalizeazaComanda',
    component: FinalizeazaComandaComponent,
  },
  {
    path: 'produseleMele',
    component: ProduseleMeleComponent,
  },
  {
    path: 'clienti',
    component: ClientiComponent,
  },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
