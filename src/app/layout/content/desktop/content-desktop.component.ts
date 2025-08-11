import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content-desktop',
  imports: [RouterOutlet],
  templateUrl: './content-desktop.component.html',
  styleUrl: './content-desktop.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContentDesktopComponent {}
