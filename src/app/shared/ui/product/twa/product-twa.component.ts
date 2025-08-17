import { ProductCard } from '@/core/interfaces';
import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TuiAppearance, TuiButton, TuiTitle } from '@taiga-ui/core';
import { TuiRating } from '@taiga-ui/kit';
import { TuiCardLarge, TuiCell, TuiHeader } from '@taiga-ui/layout';

@Component({
  selector: 'app-product-twa',
  imports: [
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    TuiCell,
    TuiRating,
    CurrencyPipe,
    FormsModule,
    RouterLink
  ],
  templateUrl: './product-twa.component.html',
  styleUrl: './product-twa.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTwaComponent {
  product = input.required<ProductCard>();
}
