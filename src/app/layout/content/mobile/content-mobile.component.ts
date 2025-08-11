import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content-mobile',
  imports: [RouterOutlet],
  templateUrl: './content-mobile.component.html',
  styleUrl: './content-mobile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContentMobileComponent {}
