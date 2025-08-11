import { filter, map, startWith } from 'rxjs';

import { NAV_HEADER_TITLES } from '@/core/constants/headers';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { TuiIcon } from "@taiga-ui/core";

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiIcon],
})
export class NavHeaderComponent {
  private readonly router = inject(Router);
  readonly counter = signal(3);

  readonly data = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      startWith(null),
      takeUntilDestroyed(),
      map(() => {
        let route = this.router.routerState.root;

        while (route.firstChild) {
          route = route.firstChild;
        }

        return (
          (route.snapshot?.data?.['header'] as {
            title: string;
            description: string;
          }) ?? NAV_HEADER_TITLES.HOME
        );
      })
    ),
    {
      initialValue: {
        ...NAV_HEADER_TITLES.HOME,
      },
    }
  );
}
