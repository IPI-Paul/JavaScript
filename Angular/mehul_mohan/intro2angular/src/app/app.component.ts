import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { updatables } from 'src/environments/environment';

interface example {
  action: string,
  description: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'intro2angular';
  showExamples: boolean = false;
  showOnline: boolean = true;
  examples: example[] = [
    {
      action: '',
      description: 'Select an example to display'
    },
    {
      action: 'goHome',
      description: 'Reload Home Page'
    },
    {
      action: 'showExamples',
      description: 'Show Examples from 1st hour'
    },
    {
      action: 'showOnline',
      description: 'Show Online records'
    }
  ];
  servers: string[] = ['mysql', 'php'];
  public server: string = this.servers[1];

  constructor(private router: Router) {}

  ngOnInit() {
    updatables.server = this.server;
  }

  get getServer() {
    return this.server;
  }

  runExample(event: any) {
    if (event.target.value !== '') {
      if (event.target.value === 'goHome') {
        this.router.navigate(['']);
      } else {
        for (let action of this.examples) {
          if (action.action !== '' && action.action === event.target.value) {
            eval(`this.${action.action} = true`);
          } else if (action.action !== '') {     
            eval(`this.${action.action} = false`);
          }
        }
      }
      event.target.selectedIndex = 0;
    }
  }

  updateServer(event: any) {
    this.server = event.target.value;
    updatables.server = this.server;
  }
}
