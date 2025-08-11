import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContextService } from '@/services/context';
import { TuiRoot } from "@taiga-ui/core";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  constructor() {
    const contextService = inject(ContextService);
    contextService.setupContext();
  }
}
