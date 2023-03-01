
import { Component } from "@angular/core";
import { CoursesService } from "./courses.service";

@Component({
  selector: 'courses' // tagNames (name), classNames (.name), ids (#name)
  ,template: `
    <h2>{{ title }}</h2>
    <ul>
      <li *ngFor="let course of courses">
        {{ course }}
      </li>
    </ul>
  `
})
export class CoursesComponent {
  title = "List of courses";
  courses;

  constructor(service: CoursesService) {
    //let service = new CoursesService;
    this.courses = service.getCourses();
  }
}