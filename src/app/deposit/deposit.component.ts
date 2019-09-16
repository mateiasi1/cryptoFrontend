import { ServersService } from '../servers/servers.service';
import { HomeService } from './deposit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
   id = 0;
  constructor(public serverService: ServersService,
              public homeService: HomeService
    ) { }

  ngOnInit() {
  }

}
