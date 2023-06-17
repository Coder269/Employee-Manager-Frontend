import { Component, ViewChild } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent {

  title = 'employee-manager';
  employees: Employee[] = [];
  currentEmployee: Employee =  {} as Employee;

  @ViewChild("navBar")
  navbar: NavbarComponent;

  searchResults = true;

  constructor(private employeeService: EmployeeService, private router: Router) {


this.navbar = new NavbarComponent(employeeService);

  }
  ngOnInit(): void {
  this.getAllEmployees();
  }

  getAllEmployees(){

    this.employeeService.getAllEmployees().subscribe(
      { next: (response: Employee[]) => { this.employees = response },  //now the new subscribe takes an object
       error : (error: HttpErrorResponse) => {alert(error.message)}}
    )
  }

  onDeleteClick(employee: Employee){

    this.currentEmployee = employee;

  }

  onEditClick(employee: Employee)
  {
    this.currentEmployee = employee;

  }

  onEditEmployee(editForm: NgForm){

    this.currentEmployee.name = editForm.value.editName;
    this.currentEmployee.email = editForm.value.editEmail;
    this.currentEmployee.jobTitle = editForm.value.editJobTitle;
    this.currentEmployee.phone = parseInt(editForm.value.editPhone);
    this.currentEmployee.imageUrl = editForm.value.editImageUrl;
    this.employeeService.updateEmployee(this.currentEmployee).subscribe(
      {
        next: (response: Employee) => this.getAllEmployees(),
        error: (error: HttpErrorResponse) => alert(error.message)
      }
    );
    document.getElementById("dismissEdit")?.click();
  }

  onDeleteEmployee() {

    this.employeeService.deleteEmployeeById(this.currentEmployee.id).subscribe(
      {
        next: (response: void ) => { this.getAllEmployees()},
        error: (error: HttpErrorResponse) => (alert(error.message))
      }
    );
    document.getElementById('dismissDelete')?.click();
  }

  filterEmployees(result: Employee[]) {

   this.employees = result;
  this.searchResults = this.navbar.SearchResults;

  }

}
