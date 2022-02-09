import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountFacadeService } from 'src/app/modules/account/services/account-facade.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {

  constructor(public accountFacade: AccountFacadeService, public router: Router) { }

  onLogout() {
    this.accountFacade.logout();
    this.router.navigate(['/account/login']);
  }

}
