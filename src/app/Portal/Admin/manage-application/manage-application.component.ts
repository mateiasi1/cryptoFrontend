import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManagerService } from 'src/app/services/manager.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-application',
  templateUrl: './manage-application.component.html',
  styleUrls: ['./manage-application.component.css']
})
export class ManageApplicationComponent implements OnInit {
  public role: string;
  feeForm: FormGroup;
  flatForm: FormGroup;

  constructor(private http: HttpClient,
              public managerService: ManagerService,
              private formBuilder: FormBuilder) { 
                this.createFeeForm();
                this.createFlatForm();
              }

  ngOnInit() {
    this.managerService.getFee();
    this.managerService.getFlatRate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.role = currentUser.token.role;
  }
  
  createFeeForm() {
    this.feeForm = this.formBuilder.group({
      feeAmount: ['', Validators.required]
    });
  }

  onSubmitFee() {
    this.managerService.addFee(this.role, this.feeForm.value.feeAmount);
    this.ngOnInit();
  }

  createFlatForm() {
    this.flatForm = this.formBuilder.group({
      flatAmount: ['', Validators.required]
    });
  }

  onSubmitFlat() {
    this.managerService.addFlatRate(this.role, this.flatForm.value.flatAmount);
  }
}
