import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {
  @Input() selectedContact: Contact = {} as Contact;

  constructor() { }

  ngOnInit(): void {
  }

  isNotEmpty(): boolean {
    return Object.keys(this.selectedContact).length > 0;
  }
}
