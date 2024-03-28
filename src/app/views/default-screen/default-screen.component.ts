import { Component, Type } from '@angular/core';
import { AdaugaAdresaLivrareComponent } from 'src/app/components/adauga-adresa-livrare/adauga-adresa-livrare.component';
import { AdaugaProdusComponent } from 'src/app/components/adauga-produs/adauga-produs.component';
import { AdministrareComponent } from 'src/app/components/administrare/administrare.component';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { ClientiComponent } from 'src/app/components/clienti/clienti.component';
import { FinalizeazaComandaComponent } from 'src/app/components/finalizeaza-comanda/finalizeaza-comanda.component';
import { InformatiiPersonaleComponent } from 'src/app/components/informatii-personale/informatii-personale.component';
import { IstoricComenziComponent } from 'src/app/components/istoric-comenzi/istoric-comenzi.component';
import { ProduseComponent } from 'src/app/components/produse/produse.component';
import { ProduseleMeleComponent } from 'src/app/components/produsele-mele/produsele-mele.component';
import { ReseteazaParolaComponent } from 'src/app/components/reseteaza-parola/reseteaza-parola.component';
import { ShowRoleComponent } from 'src/app/components/show-role/show-role.component';
import { ILoggedUser } from 'src/app/models/ILoggedUser';
import { AuthService } from 'src/app/services/auth.service';
import { ChangeComponentService } from 'src/app/services/change-component.service';
import { GreetingService } from 'src/app/services/greeting.service';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

@Component({
  selector: 'app-default-screen',
  templateUrl: './default-screen.component.html',
  styleUrls: ['./default-screen.component.scss'],
})
export class DefaultScreenComponent {
  currentUser: ILoggedUser | null = null;
  greetingMessage: string | undefined;
  showAdditionalDiv = false;
  selectedComponent: Type<any> | null = null;
  private componentMap: { [key: string]: Type<any> } = {
    footer: FooterComponent,
    istoric: IstoricComenziComponent,
    informatiiPersonale: InformatiiPersonaleComponent,
    reseteazaParola: ReseteazaParolaComponent,
    produse: ProduseComponent,
    administrare: AdministrareComponent,
    cart: CartComponent,
    adaugaProdus: AdaugaProdusComponent,
    showRol: ShowRoleComponent,
    adaugaAdresa: AdaugaAdresaLivrareComponent,
    finalizeazaComanda: FinalizeazaComandaComponent,
    myProducts: ProduseleMeleComponent,
    clienti: ClientiComponent,
  };

  constructor(
    private authService: AuthService,
    private greetingService: GreetingService,
    private componentControlService: ChangeComponentService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });
    this.componentControlService.componentChange$.subscribe((componentKey) => {
      this.changeContent(componentKey);
    });
    this.changeContent('showRol');
    this.greetingMessage = this.greetingService.getGreetingMessage();
  }
  changeContent(componentKey: string): void {
    this.showAdditionalDiv = true;
    this.selectedComponent = this.componentMap[componentKey] || null;
  }
}
