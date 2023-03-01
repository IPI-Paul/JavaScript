import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipesCardComponent } from './pipes-card.component';

describe('PipesCardComponent', () => {
  let component: PipesCardComponent;
  let fixture: ComponentFixture<PipesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
