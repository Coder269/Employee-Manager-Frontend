import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchEmployees: Employee[];
  employees: Employee[];

  SearchResults = false;

  @Output()
  onSearchEvent = new EventEmitter<Employee[]>()

  constructor(private employeeService: EmployeeService) {
    this.searchEmployees = [];
    this.employees = [];
  }
  ngOnInit(): void {
    this.getAllEmployees();
  }

  onSearch(formSearch: NgForm) {
    this.searchEmployees = [];

    for (let employee of this.employees) {

      if (employee.name.toLowerCase().indexOf(formSearch.value.result.toLowerCase()) !== -1)
      this.searchEmployees.push(employee);

      else if (employee.jobTitle.toLowerCase().indexOf(formSearch.value.result.toLowerCase()) !== -1)
      this.searchEmployees.push(employee);

      else if (employee.email.toLowerCase().indexOf(formSearch.value.result.toLowerCase()) !== -1)
      this.searchEmployees.push(employee);

      else if (employee.phone.toString().toLowerCase().indexOf(formSearch.value.result.toLowerCase()) !== -1)
      this.searchEmployees.push(employee);
    }
    this.SearchResults = true;

    if (this.searchEmployees.length === 0)
    this.SearchResults = false;

    this.onSearchEvent.emit(this.searchEmployees);


  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
      }, //now the new subscribe takes an object
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
