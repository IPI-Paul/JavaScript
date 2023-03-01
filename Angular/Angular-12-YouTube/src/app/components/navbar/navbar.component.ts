import { Component, Input, OnInit } from '@angular/core';
import { Dropdown } from 'src/app/interfaces/dropdown';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() runExample: string = '';
  title: string = '';
  childExample: string = '';
  events: Dropdown[] = [
    {value: 'Counter', text: 'Counter'},
    {value: 'Message', text: 'Wish Message'},
    {value: 'Product', text: 'Product Item'},
    {value: 'Shopping', text: 'Shopping Cart'}
  ]
  forms: Dropdown[] = [
    {value: 'Auto', text: 'Automatic Changes'},
    {value: 'Loan', text: 'Loan Calculator'},
    {value: 'Manual', text: 'Manual Changes'},
    {value: 'Password', text: 'Show Password'},
    {value: 'Register', text: 'Registration Form'},
    {value: 'SMS', text: 'SMS App'},
    {value: 'Theme', text: 'Theme Selector'}
  ]
  directives: Dropdown[] = [
    {value: 'Auth', text: 'Authenticate User'},
    {value: 'Inline', text: 'Shopping Cart'},
    {value: 'Modular', text: 'Shopping Cart Modular'}
  ]
  pipes: Dropdown[] = [
    {value: 'Component', text: 'Component Pipes'},
    {value: 'Service', text: 'Service Pipes'}
  ]
  servers: Dropdown[] = [
    {value: 'Observable', text: 'Observable with Http'},
    {value: 'Destination', text: 'Destination Error'},
    {value: 'Contacts', text: 'Contacts App'}
  ]

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    switch (this.runExample) {
      case 'data-card':
        this.title = 'Data Binding';
        break;
      case 'events-card':
        this.title = 'Event Binding';
        break;
      case 'forms-card':
        this.title = 'Forms Binding';
        break;
      case 'directives-card':
        this.title = 'Structural Directives';
        break;
      case 'pipes-card':
        this.title = 'Pipes';
        break;
      case 'user-list':
        this.title = 'Http Server';
        break;
      default:
        this.title = 'Boostrap';
        break;
    } 
  }
}
