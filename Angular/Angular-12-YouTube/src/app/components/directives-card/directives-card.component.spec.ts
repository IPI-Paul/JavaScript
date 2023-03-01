import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectivesCardComponent } from './directives-card.component';

describe('DirectivesCardComponent', () => {
  let component: DirectivesCardComponent;
  let fixture: ComponentFixture<DirectivesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectivesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectivesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
