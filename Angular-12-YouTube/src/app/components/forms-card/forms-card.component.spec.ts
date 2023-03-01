import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCardComponent } from './forms-card.component';

describe('FormsCardComponent', () => {
  let component: FormsCardComponent;
  let fixture: ComponentFixture<FormsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
