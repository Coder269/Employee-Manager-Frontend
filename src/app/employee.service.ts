import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './Employee';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) {

   }

   public getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseApiUrl}/api/v1/all`);
   }

   public getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseApiUrl}/api/v1/find/${id}`);
   }

   public addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.baseApiUrl}/api/v1/add/`, employee);
   }

   public updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.baseApiUrl}/api/v1/update/`, employee);

   }

   public deleteEmployeeById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseApiUrl}/api/v1/delete/${id}`);
   }

}
