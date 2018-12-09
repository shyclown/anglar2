import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-chip-input',
  templateUrl: 'chip-input.component.html',
  styleUrls: ['chip-input.component.scss'],
})
export class ChipInputComponent  implements  OnInit{

  /* pass form control from parent element */
  //@Input() thisFormControl: FormControl;
  @Input() thisFormGroup: FormGroup;
  @Input() thisFormControlName: string;
  @Input() thisPlaceholder: string;

  /* Data */
  @Input() values: any;
  @Input() getDataValue: () => string;
  @Input() setDataValue: () => any;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ ENTER, COMMA ];

  //fruitCtrl = new FormControl();
  setValue(value) {
    this.thisFormGroup.setValue({
          [this.thisFormControlName]: value
    });
  }

  filteredData: Observable<string[]>;

  /* Selected */
  selectedData: string[] = ['Lemon'];
  /* Pool */
  allData: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('dataInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    /* There is no control yet */
  }

  ngOnInit() {
    this.filteredData = this.thisFormGroup.valueChanges.pipe(
        startWith(null), map(
            (data: string | null) => data ?
                this._filter(data) :
                this.allData.slice()
        )
    );
  }

  add( event: MatChipInputEvent ): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.selectedData.push(value.trim());
      }
      // Reset the input value
      if (input) { input.value = ''; }
      //this.fruitCtrl.setValue(null);
      this.setValue(null);
    }
  }

  remove( data: string ): void {
    const index = this.selectedData.indexOf(data);

    if (index >= 0) {
      this.selectedData.splice(index, 1);
    }
  }

  selected( event: MatAutocompleteSelectedEvent ): void {
    this.selectedData.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.setValue(null);
    //this.fruitCtrl.setValue(null);
  }

  /* Filter in select based on input */
  private _filter(value: string): string[] {
    const filterValue = value[this.thisFormControlName].toLowerCase();
    return this.allData.filter(
        data => data.toLowerCase().indexOf(filterValue) === 0
    );
  }
}