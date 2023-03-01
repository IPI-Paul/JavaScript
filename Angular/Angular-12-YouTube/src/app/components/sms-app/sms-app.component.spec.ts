import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsAppComponent } from './sms-app.component';

describe('SmsAppComponent', () => {
  let component: SmsAppComponent;
  let fixture: ComponentFixture<SmsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
