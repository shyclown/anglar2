import { Component, OnInit } from '@angular/core';

import EditorArea from 'src/app/editor/EditorArea.js';

@Component({
  selector: 'app-public-view',
  templateUrl: './public-view.component.html',
  styleUrls: ['./public-view.component.scss']
})
export class PublicViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /* Init editor */
    const editor = new EditorArea({ input_id: 'inputTest', form_id: 'formTest'});
    console.log(editor);
  }

}
