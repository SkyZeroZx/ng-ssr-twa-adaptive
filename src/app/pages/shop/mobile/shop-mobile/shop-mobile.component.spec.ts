import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMobileComponent } from './shop-mobile.component';

describe('ShopMobileComponent', () => {
  let component: ShopMobileComponent;
  let fixture: ComponentFixture<ShopMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
