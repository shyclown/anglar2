import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: {
      'class': 'app-card',
      '[class.mat-card-actions-align-end]': 'data === "all"',
  },
    inputs:['classes','rootClass','headerClass','bodyClass','footerClass']

})


export class CardComponent implements OnInit {

  @Input() classes: {
      root: string,
      header: string,
      content: string,
      footer:string
  };

  @Input() styles: {
      root: string,
      header: string,
      body: string,
      footer:string
  };

  @Input() data: any;

  constructor() {
      console.log(this.data);
      console.log (this);
      console.log(this.classes)
  }







  ngOnInit() {
      console.log (this);
      console.log(this.classes)
      /*
        if(!this.classes){ this.classes = { root: '', header:'', body:'', footer:'' } }
      */
  }

}
