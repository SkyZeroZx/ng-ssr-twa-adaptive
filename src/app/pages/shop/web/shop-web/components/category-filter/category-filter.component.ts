import { ProductService } from '@/services/product';
import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-category-filter',
  imports: [TitleCasePipe , RouterLink , RouterLinkActive],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFilterComponent {
    readonly categories = toSignal(
    inject(ProductService).getCategoryList(),
    { initialValue: [] }
  );
}
