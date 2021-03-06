import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-chip-input',
    templateUrl: 'chip-input.component.html',
    styleUrls: ['chip-input.component.scss'],
})
export class ChipInputComponent implements OnInit
{
    new: any[] = [];

    @Input() debug: boolean;

    @Input() thisFormGroup: FormGroup;
    @Input() thisFormControlName: string;
    @Input() thisPlaceholder: string;
    /* Data */
    @Input() dataset: any[];
    @Input() selected: any[];
    @Input() getDataValue: (data: any) => string;
    @Input() setDataValue: (data: string) => any;
    @Input() getDataIndexValue: (data: any) => any;
    @Input() getIndexes : boolean;
    @Input() allowNew : boolean;
    @Input() separateNew : boolean;
    @Input() setDataValueForNew: (data: string) => any;

    /* Settings */
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    localInputControl = new FormControl();
    filteredData: Observable<any[]>;

    @ViewChild('dataInput') dataInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    optionSelected = false;

    setFormGroupValue(value) {
        this.debug && console.log(value);
        this.thisFormGroup.value[this.thisFormControlName] = value;
        this.thisFormGroup.setValue( this.thisFormGroup.value );
    }

    getValue(rawValue) {
        this.debug && console.log(rawValue);
        if (this.getDataValue) { return this.getDataValue(rawValue) }
        else { return rawValue; }
    }

    setValue(rawInput) {
        this.debug && console.log(rawInput);
        if (this.setDataValue) { return this.setDataValue(rawInput) }
        else{ return rawInput }
    }

    constructor() { }

    ngOnInit() {
        this.filteredData = this.localInputControl.valueChanges.pipe(
            startWith(null), map(
                (data: string | null) => {
                    return data && (typeof data === 'string') ?
                        this._filter(data)
                        :
                        this.removeSelectedFromDataset(this.dataset)

                }
            )
        );
    }

    removeSelectedFromDataset = (dataset) => {
        return dataset.filter( data => !this.inSelected(this.getDataValue(data)));
    };

    inputBlurEvent(){
        this.dataInput.nativeElement.value = '';
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = this.dataInput.nativeElement.value;

        if (this.inSelected(value)) { /* Do Nothing */
        } else if ((value || '').trim()) {
            this.selected.push(this.setValue(value.trim()));
        }
        if (input) {
            input.value = '';
        }
        this.setFormGroupValue(this.selected);
        this.localInputControl.setValue(null);
    }

    remove(data: any): void {
        this.selected = this.selected.filter(
            selectedData =>
                this.getDataValue(selectedData) !== this.getDataValue(data)
        );
        console.log(this.selected);
        this.setFormGroupValue(this.selected);
    }

    inSelected = ( inputValue: string ) => {
        return this.selected.filter(
            selected => {
                return this.getDataValue( selected ) === inputValue.trim()
            }
        ).length > 0
    };

    selectOption(event: MatAutocompleteSelectedEvent): void {
        this.selected.push(event.option.value);
        this.optionSelected = true;
    }


    private _filter(inputText: string): any[] {
        return this.removeSelectedFromDataset(this.dataset).filter(data =>
            this.getDataValue(data)
                .toLowerCase()
                .indexOf(
                    inputText.toLowerCase()
                ) === 0
        );
    }
}