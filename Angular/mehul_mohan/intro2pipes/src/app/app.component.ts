import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'intro2pipes';
  components = ['Directives', 'Pipes'];
  showComponent: any; 

  get getComponent() {
    if(!this.showComponent) this.showComponent = 'Directives';
    return this.showComponent;
  }
}
