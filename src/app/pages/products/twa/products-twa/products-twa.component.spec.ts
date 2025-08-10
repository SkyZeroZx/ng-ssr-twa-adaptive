import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsTwaComponent } from './products-twa.component';

describe('ProductsTwaComponent', () => {
  let component: ProductsTwaComponent;
  let fixture: ComponentFixture<ProductsTwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsTwaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsTwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
