import { Injectable } from '@angular/core';
import { Employee, Employees } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employee: Employee = Employees[0];

  constructor() { }

  getEmployee(): Employee {
    return this.employee;
  }
}
