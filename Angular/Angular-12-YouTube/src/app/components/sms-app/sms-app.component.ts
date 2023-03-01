import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sms-app',
  templateUrl: './sms-app.component.html',
  styleUrls: ['./sms-app.component.css']
})
export class SmsAppComponent implements OnInit {
  message: string = '';
  maxCharCount: number = 200;

  constructor() { }

  ngOnInit(): void {
  }

}
