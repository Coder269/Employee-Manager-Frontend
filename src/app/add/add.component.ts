import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../Employee';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  employees: Employee[];
  newEmployee: Employee;

  @Output()
  onAddEvent = new EventEmitter();

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employees = [];
    this.newEmployee = {} as Employee;
  }

  onAddEmployee(addForm: NgForm) {
    this.newEmployee.name = addForm.value.addName;
    this.newEmployee.email = addForm.value.addEmail;
    this.newEmployee.jobTitle = addForm.value.addJobTitle;
    this.newEmployee.phone = parseInt(addForm.value.addPhone);
    this.newEmployee.imageUrl = addForm.value.addImageUrl;

    this.employeeService.addEmployee(this.newEmployee).subscribe({
      next: (response: Employee) => console.log(response),
      error: (error: HttpErrorResponse) => alert(error.message),
    });
    this.onAddEvent.emit();
    this.router.navigate(['Main']);
  }

  onCancel() {
    this.router.navigate(['Main']);
  }
}
