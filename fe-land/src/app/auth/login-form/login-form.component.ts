import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCard} from "@angular/material";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    @ViewChild(MatCard) menu: MatCard;
  constructor() { }

  ngOnInit() {
  }

}
