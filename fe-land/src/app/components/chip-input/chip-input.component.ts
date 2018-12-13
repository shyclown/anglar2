import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormControlName, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

class Tag{
    id: number;
    name: string;
}

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
    @Input() dataset: any[];
    @Input() selected: any[];

    new: any[];

    @Input() getDataValue: (data: any) => string;
    @Input() setDataValue: (data: string) => any;
    @Input() getDataIndexValue: (data: any) => any;

    @Input() getIndexes : boolean;
    @Input() allowNew : boolean;
    @Input() separateNew : boolean;

    /* Settings */
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    localCtrl = new FormControl();

    setFormGroupValue(value) {
        this.thisFormGroup.value[this.thisFormControlName] = value;
        this.thisFormGroup.setValue(
            this.thisFormGroup.value
        );
    }

    getValue(rawValue){
        if (this.getDataValue) { return this.getDataValue(rawValue) }
        else { return rawValue; }
    }
    setValue(rawInput){
        if (this.setDataValue) { return this.getDataValue(rawInput) }
        else{ return rawInput }
    }

    getIndex(data){
        if (this.getDataIndexValue) {
            return this.getDataIndexValue(data)
        } else { return data.id }
    }



    filteredData: Observable<any[]>;

    allData: Tag[] = [{id:1, name:"Apple"}];

    @ViewChild('dataInput') dataInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor() {
        /* There is no control yet */
    }

    ngOnInit() {
        this.filteredData = this.localCtrl.valueChanges.pipe(
            startWith(null), map(
                (data: string | null) => {
                    console.log('init ', data);
                    return data && (typeof data === 'string') ?
                        this._filter(data) :
                        this.allData.slice()

                }
            )
        );
    }

    add(event: MatChipInputEvent): void {
        //if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

            /* Do not add values twice */
            if( this.isInSelected(value) ){
                // Do nothing
            } else if ((value || '').trim()) {
                this.selected.push(this.setValue(value.trim()));
            }

            if (input) {
                input.value = '';
            }

            this.localCtrl.setValue(null);
            console.log('add = selected', this.selected);
            this.setFormGroupValue(this.selected);
        //}
    }
/* TODO */
    remove(data: string): void {
        const index = this.selected.indexOf(data);
        if (index >= 0) {
            this.selected.splice(index, 1);
        }
    }

    isInSelected = ( value ) => {
        return this.selected.filter(
            selected => {
                return this.getDataValue( selected ) === value.trim()
            }
        ).length > 0
    };

    isInNew = ( value ) => {

    };

    /* triggered by clicking on option */
    selectOption(event: MatAutocompleteSelectedEvent): void {
        /* add value to selected data */
        this.selected.push(event.option.value);
        /* clear elements is something is written */
        this.dataInput.nativeElement.value = '';
        this.localCtrl.setValue(null);
    }

    /* Filter in select options based on input */
    private _filter(inputText: string): any[] {
        const filterValue = inputText.toLowerCase();
        /* find objects with value */
        return this.dataset.filter(data =>
            this.getDataValue(data).toLowerCase().indexOf(filterValue) === 0
        );
    }
}