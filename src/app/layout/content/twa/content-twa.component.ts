import { Subject } from 'rxjs';

import {
  NavBottomComponent,
  NavHeaderComponent,
} from '@/layout/content/twa/components';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  pulled() {
    setTimeout(() => {
      this.loaded$.next();
    }, 1000);
  }
}
