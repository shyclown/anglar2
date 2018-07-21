import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from './data/data.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[DataComponent],
  declarations: [DataComponent]
})
export class ConnectorModule { }
