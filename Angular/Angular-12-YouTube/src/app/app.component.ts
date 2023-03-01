import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface example {
  action: string,
  description: string,
  params?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-12-YouTube';
  showBootstrap: boolean = false;
  showBootstrapSample: boolean = false;
  showFirstApp: boolean = false;
  showIcons: boolean = false;
  showNavbar: boolean = false;
  showRoutes: boolean = false;
  childExample: string = '';
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
      action: 'showNavbar',
      description: 'Show Bootstrap Example',
      params: 'bootstrap-card'
    },
    {
      action: 'showBootstrapSample',
      description: 'Show Bootstrap Sample'
    },
    {
      action: 'showNavbar',
      description: 'Show Data Bindings Example',
      params: 'data-card'
    },
    {
      action: 'showNavbar',
      description: 'Show Events Bindings Examples',
      params: 'events-card'
    },
    {
      action: 'showFirstApp',
      description: 'Show First App Example'
    },
    {
      action: 'showNavbar',
      description: 'Show Forms Bindings Examples',
      params: 'forms-card'
    },
    {
      action: 'showNavbar',
      description: 'Show Http Server Examples',
      params: 'user-list'
    },
    {
      action: 'showIcons',
      description: 'Show Icons Example'
    },
    {
      action: 'showNavbar',
      description: 'Show Pipes Examples',
      params: 'pipes-card'
    },
    {
      action: 'showRoutes',
      description: 'Show Router Examples'
    },
    {
      action: 'showNavbar',
      description: 'Show Structural Directives Examples',
      params: 'directives-card'
    }
  ];

  constructor(private router: Router) {}

  runExample(event: any) {
    if (event.target.value !== '') {
      if (event.target.value === 'goHome') {
        eval(`this.childExample = ''`);
        for (let action of this.examples) {
          if (action.action !== '' && 
            this.examples[event.target.selectedIndex].action !== action.action)
          eval(`this.${action.action} = false`);
        }
        this.router.navigate(['']);
      } else {
        for (let action of this.examples) {
          if (action.action !== '' && action.action === event.target.value) {
            if (action.params) {
              eval(`this.childExample = 
                '${this.examples[event.target.selectedIndex].params}'`);
            }
            eval(`this.${action.action} = true`);
          } else if (action.action !== '') {     
            eval(`this.${action.action} = false`);
          }
        }
      }
      event.target.selectedIndex = 0;
    }
  }
}
