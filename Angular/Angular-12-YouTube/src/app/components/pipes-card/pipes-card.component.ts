import { Component, Input, OnInit } from '@angular/core';
import { Employee, Employees } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-pipes-card',
  templateUrl: './pipes-card.component.html',
  styleUrls: ['./pipes-card.component.css']
})
export class PipesCardComponent implements OnInit {
  @Input() getExample: string = '';
  employee: Employee = {} as Employee;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {  
  }

  ngOnChanges(): void {
    this.updateEmployee();
  }

  updateEmployee(): void {
    console.log(this.getExample);    
    if(this.getExample == 'Component') {
      this.employee = Employees[0];
    } else if(this.getExample == 'Service') {
      this.employee = this.employeeService.getEmployee();
    }
  }
}
