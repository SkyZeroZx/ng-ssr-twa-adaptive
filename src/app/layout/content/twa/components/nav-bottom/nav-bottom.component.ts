import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiTabBar } from '@taiga-ui/addon-mobile';

@Component({
  selector: 'app-nav-bottom',
  imports: [TuiTabBar, RouterLink, RouterLinkActive],
  templateUrl: './nav-bottom.component.html',
  styleUrl: './nav-bottom.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBottomComponent {}
