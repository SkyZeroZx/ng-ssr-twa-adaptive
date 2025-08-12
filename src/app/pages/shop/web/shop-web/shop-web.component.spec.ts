import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopWebComponent } from './shop-web.component';

describe('ShopWebComponent', () => {
  let component: ShopWebComponent;
  let fixture: ComponentFixture<ShopWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopWebComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
