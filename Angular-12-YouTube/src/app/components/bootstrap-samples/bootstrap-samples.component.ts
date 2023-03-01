import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bootstrap-samples',
  templateUrl: './bootstrap-samples.component.html',
  styleUrls: ['./bootstrap-samples.component.css']
})
export class BootstrapSamplesComponent implements OnInit {
  buttons = [
    'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light',
    'dark', 'link'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
