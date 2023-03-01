import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent implements OnInit {
  someRandomValriable = true;
  data = [
    {
      lang: 'JavaScript',
      usedOn: 'web'
    },
    {
      lang: 'Swift',
      usedOn: 'iOS'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
