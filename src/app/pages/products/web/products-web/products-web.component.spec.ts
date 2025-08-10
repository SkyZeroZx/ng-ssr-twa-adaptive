import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsWebComponent } from './products-web.component';

describe('ProductsWebComponent', () => {
  let component: ProductsWebComponent;
  let fixture: ComponentFixture<ProductsWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsWebComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
