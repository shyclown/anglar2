import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormControlName, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-chip-input',
    templateUrl: 'chip-input.component.html',
    styleUrls: ['chip-input.component.scss'],
})
export class ChipInputComponent implements OnInit {
    @Input() thisFormGroup: FormGroup;
    @Input() thisFormControlName: string;
    @Input() thisPlaceholder: string;
    /* Data */
    @Input() values: any;
    @Input() getDataValue: () => string;
    @Input() setDataValue: () => any;
    /* Settings */
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    localCtrl = new FormControl();

    setValue(value) {
        this.thisFormGroup.value[this.thisFormControlName]=value;
        this.thisFormGroup.setValue(
            this.thisFormGroup.value
        );
    }

    filteredData: Observable<string[]>;
    selectedData: string[] = ['Lemon'];
    allData: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    @ViewChild('dataInput') dataInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor() {
        /* There is no control yet */
    }

    ngOnInit() {
        this.filteredData = this.localCtrl.valueChanges.pipe(
            startWith(null), map(
                (data: string | null) => data ?
                    this._filter(data) :
                    this.allData.slice()
            )
        );
    }

    add(event: MatChipInputEvent): void {

        console.log(event)

        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

            if ((value || '').trim()) {
                this.selectedData.push(value.trim());
            }

            if (input) {
                input.value = '';
            }

            this.localCtrl.setValue(null);
            console.log(this.selectedData);
            this.setValue(this.selectedData);
        }
    }

    remove(data: string): void {
        const index = this.selectedData.indexOf(data);
        if (index >= 0) {
            this.selectedData.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.selectedData.push(event.option.viewValue);
        this.dataInput.nativeElement.value = '';
        this.localCtrl.setValue(null);
    }

    /* Filter in select based on input */
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allData.filter(
            data => data.toLowerCase().indexOf(filterValue) === 0
        );
    }
}