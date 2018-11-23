import { Component, OnInit } from '@angular/core';
import UserService from "../services/user.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  data: string;

  constructor(
      private theUserService: UserService
  ) {
      theUserService.userData().subscribe( r => console.log(r));

    this.data = 'data';
  }

  ngOnInit() {
  }

}
