import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicesService } from '../services.service';
// import { HomepageComponent } from '../homepage/homepage.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  EmpData:any;
  DeptData:any;
  emp:any;
  dept:any;

  constructor(private http:HttpClient,private services:ServicesService) { }

  ngOnInit(): void {

   this.emp = this.services.getEmployeesData();
   this.dept = this.services.getDepartmentData();

    this.http.get('http://localhost:7000/GetEmployeesData').subscribe((data: any) => {
      this.EmpData = data;
    })
    this.http.get('http://localhost:7000/GetDepartmentData').subscribe((data: any) => {
        this.DeptData = data;
      })

      console.log(this.emp);
      console.log(this.dept);
      console.log(this.EmpData);
      console.log(this.DeptData);
  }

 getGradientColor(employeeCount: number, departmentCount: number): string {
  const total = employeeCount + departmentCount;
  const employeePercentage = (employeeCount / total) * 100;
  const gradientColor = `conic-gradient(
    #3498db 0% ${employeePercentage}%,
    #e74c3c ${employeePercentage}% 100%
  )`;
  return gradientColor;
}

}
