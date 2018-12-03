import {
    Component, CUSTOM_ELEMENTS_SCHEMA,
    Input,
    OnInit,

} from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],

})
export class PanelComponent implements OnInit {

  @Input() toolbar;
  @Input() content;
  @Input() footer;

  constructor() {
    this.toolbar = this.toolbar || null;
    this.content = this.content || null;
    this.footer = this.footer || null
  }

  ngOnInit() {

  }

}
