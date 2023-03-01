export interface Employee {
  sno: string;
  name: string;
  age: number;
  designation: string;
  doj: Date;
  salary: number;
}

export const Employees: Employee[] = [
  {
    sno: 'aa101', name: 'john', age: 35, designation: 'Tech Lead', doj: new Date(), 
    salary: 45000
  }
]