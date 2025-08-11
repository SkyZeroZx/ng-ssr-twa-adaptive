import { Subject } from 'rxjs';

import {
  NavBottomComponent,
  NavHeaderComponent,
} from '@/layout/content/twa/components';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet, Scroll } from '@angular/router';
import {
  TUI_PULL_TO_REFRESH_LOADED,
  TuiPullToRefresh,
} from '@taiga-ui/addon-mobile';

@Component({
  selector: 'app-content-twa',
  imports: [
    RouterOutlet,
    TuiPullToRefresh,
    NavHeaderComponent,
    NavBottomComponent,
  ],
  templateUrl: './content-twa.component.html',
  styleUrl: './content-twa.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_PULL_TO_REFRESH_LOADED,
      useClass: Subject,
    },
  ],
})
export default class ContentTwaComponent {
  private readonly loaded$ = inject<Subject<void>>(TUI_PULL_TO_REFRESH_LOADED);
  private readonly router = inject(Router);
  readonly isFullScreen = signal(false);

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.getDataFromRouter();
      }

      if (event instanceof Scroll) {
        this.getDataFromRouter();
      }
    });
  }

  pulled() {
    setTimeout(() => {
      this.loaded$.next();
    }, 1000);
  }

  getDataFromRouter() {
    const data = this.getDataFromParent();
    this.isFullScreen.set(data['fullScreen'] ?? false);
  }

  getDataFromParent() {
    let route = this.router.routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.snapshot.data;
  }
}
