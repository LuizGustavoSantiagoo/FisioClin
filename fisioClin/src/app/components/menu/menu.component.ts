import { Component } from '@angular/core';
import { ClrIconModule, ClrVerticalNavModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { ClarityIcons, homeIcon, administratorIcon} from '@cds/core/icon';
ClarityIcons.addIcons(homeIcon, administratorIcon);

@Component({
  selector: 'app-menu',
  imports: [
    ClrIconModule,
    RouterModule,
    ClrVerticalNavModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {

}
