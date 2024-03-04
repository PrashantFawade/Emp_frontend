import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {

  AddemployeeForm!: FormGroup;
  AddDepartmentForm!: FormGroup;
  AssignDepartmentForm: FormGroup;
  // EditEmpForm: FormGroup;

  EmployeesData: any;
  DepartmentData: any;
  AssignDepartmentData: any;
  successMsg = '';
  errorMsg = '';
  successDept = '';
  errorDept = '';
  successAssig = '';
  errorAssig = '';

  editempData:any;
  empName: any;
  empEmail: any;
  empDob: any;
  empMobnum: any;
  empAddress: any;
  empPincode: any;

  deptName: any;
  deptUnit: any;
  deptCode: any;
  deptLocation: any;
  deptContact: any;

  empname: any;
  assignedDeptData: any;

  isLoading: boolean = false;
  loading: boolean = false;
  isModalOpen: boolean = false;

  deleteAssiDeptID: any;
  deleteDepartID: any;
  deleteEmpID: any;

  constructor(private formBuilder: FormBuilder, private services: ServicesService, private http: HttpClient) {
    // this.AddemployeeForm = this.formBuilder.group({
    //   name : ['', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
    //   dob : ['', [Validators.required]],
    //   address: ['', [Validators.required]],
    //   mobNumber: ['', [Validators.required]],
    //   email: ['', [Validators.required]],
    //   pincode : ['', [Validators.required , Validators.pattern(/[0-9]{6}$/)]],
    // });

    // this.AddDepartmentForm = this.formBuilder.group({
    //   deptname: ['', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
    //   deptCode: ['', [Validators.required]],
    //   unit: ['', [Validators.required]],
    //   contact: ['', [Validators.required]],
    //   location: ['', [Validators.required]]
    // });

    this.AssignDepartmentForm = this.formBuilder.group({
      empName: ['', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
      detName: ['', [Validators.required, Validators.pattern(/[A-Za-z]/)]]
    });

    // this.EditEmpForm = this.formBuilder.group({
    //   name: ['', [Validators.required]],
    //   dob: ['', [Validators.required]],
    //   address: ['', [Validators.required]],
    //   mobNumber: ['', [Validators.required]],
    //   email: ['', [Validators.required]],
    //   pincode: ['', [Validators.required, Validators.pattern(/[0-9]{6}$/)]],
    // });
  }

  ngOnInit() {
    // this.AddemployeeForm = this.formBuilder.group({
    // Name: ['', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
    // // lastName: ['', [Validators.required,Validators.pattern(/[A-Za-z]/)]],
    // mobNo: ['', [Validators.required, Validators.pattern(/[1-9][0-9]{9}$/)]],
    // password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,10}$/)]],
    // confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    // state: ['', [Validators.required]],
    // city: ['', [Validators.required, Validators.pattern(/[A-Za-z]/), Validators.minLength(3)]],
    // zip: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/[0-9]{6}$/)]],
    // area: ['', [Validators.required]]
    // })

    this.AddemployeeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mobNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern(/[0-9]{6}$/)]],
    });

    this.AddDepartmentForm = this.formBuilder.group({
      deptname: ['', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
      deptCode: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });

    this.http.get('http://localhost:7000/GetEmployeesData').subscribe((data: any) => {
      this.EmployeesData = data;
    })

    this.http.get('http://localhost:7000/GetDepartmentData').subscribe((data: any) => {
      this.DepartmentData = data;
    })

    this.http.get('http://localhost:7000/GetAssignedDepartmentData').subscribe((data: any) => {
      this.AssignDepartmentData = data;
    })

    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      this.notifications = JSON.parse(storedNotifications); // Load the notifications array from localStorage
    }

  }

  deleteNotification(index: number) {
    this.notifications.splice(index, 1);
  }

  /* fetching Employees Data */
  // getEmployeesData(){
  //   return  this.http.get('http://localhost:7000/GetEmployeesData').subscribe((data:any)=>{
  //     this.EmployeesData = data;
  //     console.log(this.EmployeesData);

  //   });
  // }

  onSubmitAddemployeeForm(): void {
    this.successMsg = this.errorMsg = '';
    let Edata = this.AddemployeeForm.value;

    this.loading = true;
    setTimeout(() => {
      this.services.AddEmployee(Edata).subscribe(
        (success) => {
          this.successMsg = "Employee '" + Edata.name + "' Added successfully !!";
          this.notifications.push(this.successMsg);
          localStorage.setItem('notifications', JSON.stringify(this.notifications));
        },
        (error) => {
          this.errorMsg = "Employee Adding Failed !!";
          this.notifications.push(this.errorMsg);
          localStorage.setItem('notifications', JSON.stringify(this.notifications));
        }
      );
      this.loading = false;

    }, 1000)

    this.AddemployeeForm.reset();
    this.successMsg = this.errorMsg = '';
  }

  onClear(): void {
    this.AddemployeeForm.reset();
  }

  onSubmitAddDepartmentForm(): void {
    const AddDept = this.AddDepartmentForm.value;
    this.successDept = this.errorDept = '';
    this.loading = true;

    setTimeout(() => {
      this.services.AddDepartment(AddDept).subscribe(
        (success) => {
          this.successDept = "Department '" + AddDept.deptname + "' Added successfully !!";
          this.notifications.push(this.successDept);
          localStorage.setItem('notifications', JSON.stringify(this.notifications));
        },
        (error) => {
          this.errorDept = "Department Adding Failed !!";
          this.notifications.push(this.errorDept);
          localStorage.setItem('notifications', JSON.stringify(this.notifications));
        }
      );
      this.loading = false;
    }, 1000);


    this.AddDepartmentForm.reset();
  }

  onClear2(): void {
    this.AddDepartmentForm.reset();
  }

  onSubmitAssignDepartmentForm() {
    const Assign = this.AssignDepartmentForm.value

    this.successAssig = this.errorAssig = '';
    this.loading = true;

    setTimeout(() => {
      this.services.AssignDepartment(Assign).subscribe(
        (success) => {
          this.successAssig = Assign.empName + " Assigned with '" + Assign.detName + "' successfully !!"
          this.notifications.push(this.successAssig);
          localStorage.setItem('notifications', JSON.stringify(this.notifications));
        },
        (error) => {
          this.errorAssig = "Department Assigning Failed !!";
          this.notifications.push(this.errorAssig);
          localStorage.setItem('notifications', JSON.stringify(this.notifications));
        });
      this.loading = false;

    }, 1000);

    this.AssignDepartmentForm.reset();
  }

  onClear3(): void {
    this.AssignDepartmentForm.reset();
  }

  ViewEmployeeModal() {

    const modal = document.getElementById('View-Employee');
    if (modal) {
      modal.style.display = 'block';
    }



  }

  closeViewEmployeeModal() {
    const modal = document.getElementById('View-Employee');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  private highestZIndex = 1000;
  private openedModal: HTMLElement | null = null;

  // Function to open a modal
  openModal(modalId: string) {

    this.http.get('http://localhost:7000/GetEmployeesData').subscribe((data: any) => {
      this.EmployeesData = data;
    })
    this.http.get('http://localhost:7000/GetDepartmentData').subscribe((data: any) => {
        this.DepartmentData = data;
      })

    // Close the currently opened modal if it exists
    if (this.openedModal) {
      this.closeModal(this.openedModal.id);
    }

    if (modalId == 'View-Employee') {
      this.http.get('http://localhost:7000/GetEmployeesData').subscribe((data: any) => {
        this.EmployeesData = data;
      })
    }

    if (modalId == 'View-Department') {
      this.http.get('http://localhost:7000/GetDepartmentData').subscribe((data: any) => {
        this.DepartmentData = data;
      })
    }

    if (modalId == 'View-AssignedDepartment') {
      this.http.get('http://localhost:7000/GetAssignedDepartmentData').subscribe((data: any) => {
        this.AssignDepartmentData = data;
      })
    }

    // Increase the highestZIndex
    this.highestZIndex++;

    // Get the modal element
    const modal = document.getElementById(modalId);

    this.isLoading = true;
    setTimeout(() => {
      // Check if the modal is not null
      if (modal) {

        // Set the z-index of the modal to the highestZIndex
        modal.style.zIndex = this.highestZIndex.toString();

        // Open the modal
        modal.style.display = "block";
        // Set the openedModal to the current modal
        this.openedModal = modal;
      }

      this.isLoading = false;
    }, 1000);

  }


  // Function to close a modal
  closeModal(modalId: string) {
    // Get the modal element
    const modal = document.getElementById(modalId);

    // Check if the modal is not null
    if (modal) {
      // Close the modal
      modal.style.display = "none";

      // Optional: Reset the z-index of the modal
      modal.style.zIndex = "1";
      // Reset the openedModal
      this.openedModal = null;
    }
  }

  editAssignedDepartment(empName: any, id: any) {
    this.empname = empName;
    this.assignedDeptData = id;
    const modal = document.getElementById('editdept');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  editDept(dept: any) {
    const _id = this.assignedDeptData._id;
    let url = `http://localhost:7000/updateDepartment/${_id}`;
    this.http.put(url, { department: dept }).subscribe((boolean: any) => {
      return boolean;
    });

    setTimeout(() => {
      const modal = document.getElementById('editdept');
      if (modal) {
        modal.style.display = 'none';
      }
      const Nmodal = document.getElementById('View-AssignedDepartment');
      if (Nmodal) {
        Nmodal.style.display = 'none';
      }
    }, 500);

  }

  editEmployee(data: any) {
    this.editempData = data;
    this.empName = data.name;
    this.empEmail = data.email;
    this.empDob = data.dob;
    this.empMobnum = data.mobNumber;
    this.empAddress = data.address;
    this.empPincode = data.pincode;

    const modal = document.getElementById('editEmployee');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  UpdateEmployee(EmpData:any){

    console.log(EmpData);

    this.http.put('http://localhost:7000/EditEmployeesData' , EmpData).subscribe((responce: any) => {
      console.log(responce);
        return responce;
      })

  }

  editDepartment(deptData: any) {
    this.deptName = deptData.deptname;
    this.deptUnit = deptData.unit;
    this.deptCode = deptData.deptCode;
    this.deptLocation = deptData.location;
    this.deptContact = deptData.contact;

    const modal = document.getElementById('editDepartment');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  // delete rows modals
  // Delete Assigned Department Mothods

  deleteAssiDeptModal(deptID: any) {
    this.isModalOpen = true;
    const modal = document.getElementById('deleteAssignedDeptModal');
    if (modal) {
      modal.style.display = 'block';
    }
    this.deleteAssiDeptID = deptID;
  }

  deleteAssiDept() {
    let Did = this.deleteAssiDeptID;
    setTimeout(() => {
      this.http.delete(`http://localhost:7000/deleteAssignedDepartment/${Did}`).subscribe(response => {
        return response;
      });

      const Nmodal = document.getElementById('View-AssignedDepartment');
      if (Nmodal) {
        Nmodal.style.display = 'none';
      }
    }, 500);
    this.closedeleteAssideptModal();

  }

  closedeleteAssideptModal() {
    this.isModalOpen = false;
    const modal = document.getElementById('deleteAssignedDeptModal');
    if (modal) {
      modal.style.display = 'none';
    };
  }

  // Delete Department Methods

  deleteDepartment(id: any) {
    this.isModalOpen = true;
    const modal = document.getElementById('deleteDepartment');
    if (modal) {
      modal.style.display = 'block';
    }
    this.deleteDepartID = id;
  }

  deleteDept() {
    let did = this.deleteDepartID;

    setTimeout(() => {
      this.http.delete(`http://localhost:7000/deleteDepartment/${did}`).subscribe(response => {
        return response;
      });

      const Nmodal = document.getElementById('View-Department');
      if (Nmodal) {
        Nmodal.style.display = 'none';
      }
    }, 500);
    this.closedeletedeptModal();
  }

  closedeletedeptModal() {
    this.isModalOpen = false;
    const modal = document.getElementById('deleteDepartment');
    if (modal) {
      modal.style.display = 'none';
    };
  }

  //  Delete Employee Methods

  deleteEmp(Eid: any) {
    this.isModalOpen = true;
    const modal = document.getElementById('deleteEmpModal');
    if (modal) {
      modal.style.display = 'block';
    }
    this.deleteEmpID = Eid;
  }

  deleteEmployee() {
    let eID = this.deleteEmpID;

    setTimeout(() => {
      this.http.delete(`http://localhost:7000/deleteEmployee/${eID}`).subscribe(response => {
        return response;
      });

      const Nmodal = document.getElementById('View-Employee');
      if (Nmodal) {
        Nmodal.style.display = 'none';
      }
    }, 500);
    this.closedeleteEmpModal();
  }


  closedeleteEmpModal() {
    this.isModalOpen = false;
    const modal = document.getElementById('deleteEmpModal');
    if (modal) {
      modal.style.display = 'none';
    };
  }

  // notifications = ['Employee Added Successfully !!', '"MFGADM" Department Added Successfully !!', 'User ID "1001" Deleted.', 'Action Needed !!','"MFGADM" Department Added Successfully !!'];
  notifications = ['Employee Added Successfully !!'];

  openNotificationModal() {
    this.isModalOpen = true;
    const modal = document.getElementById('notificationModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeNotificationModal() {
    this.isModalOpen = false;
    const modal = document.getElementById('notificationModal');
    if (modal) {
      modal.style.display = 'none';
    };
  }

}


