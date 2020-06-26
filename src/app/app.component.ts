import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from './_alert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularNestedRouting';

  environmentName = '';
  environmentUrl = '';

  constructor(public alertService: AlertService) {
    this.environmentName = environment.environmentName;
    this.environmentUrl = environment.apiUrl;
  }
}
