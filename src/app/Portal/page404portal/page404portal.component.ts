import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page404portal',
  templateUrl: './page404portal.component.html',
  styleUrls: ['./page404portal.component.css']
})
export class Page404portalComponent implements OnInit {

  environmentURL = environment.apiUrl;
  constructor() { }

  ngOnInit() {
  }

}
