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
export class ChipInputComponent implements OnInit
{
    @Input() debug: boolean;

    @Input() thisFormGroup: FormGroup;
    @Input() thisFormControlName: string;
    @Input() thisPlaceholder: string;

    /* Data */
    @Input() dataset: any[];
    @Input() selected: any[];
    new: any[] = [];

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
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    localInputControl = new FormControl();

    setFormGroupValue(value) {
        this.thisFormGroup.value[this.thisFormControlName] = value;
        this.thisFormGroup.setValue( this.thisFormGroup.value );
    }
    getValue(rawValue){
        if (this.getDataValue) { return this.getDataValue(rawValue) }
        else { return rawValue; }
    }
    setValue(rawInput){

        if (this.setDataValue) { return this.setDataValue(rawInput) }
        else{ return rawInput }
    }

    getIndex(data){
        if (this.getDataIndexValue) {
            return this.getDataIndexValue(data)
        } else { return data.id }
    }

    filteredData: Observable<any[]>;



    @ViewChild('dataInput') dataInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor() {
        /* There is no control yet */
    }

    ngOnInit() {
        this.filteredData = this.localInputControl.valueChanges.pipe(
            startWith(null), map(
                (data: string | null) => {
                    return data && (typeof data === 'string') ?
                        this._filter(data) :
                        this.dataset.slice()

                }
            )
        );
    }

    dump(value){
        if(this.debug){
        Array.isArray(value) ?
        value.map(
            v => console.warn('DEBUG: ', v )
        ) : console.warn( 'DEBUG: ', value);
        }
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

            this.dump(value);
            this.dump(['selected', this.setValue(value)]);

        if( this.inSelected(value) ){
            this.dump(['selected', value])
        }
        else if ((value || '').trim()) {
            this.selected.push(this.setValue(value.trim()));
        }
        if (input) { input.value = ''; }
        this.setFormGroupValue(this.selected);
        /* clear input */
        this.localInputControl.setValue(null);
    }

    remove(data: any): void {
        this.selected = this.selected.filter(
            selectedData =>
                this.getDataValue(selectedData) !== this.getDataValue(data)
        );
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
        this.dataInput.nativeElement.value = '';
        this.localInputControl.setValue(null);
    }

    private _filter(inputText: string): any[] {
        return this.dataset.filter(data =>
            this.getDataValue(data)
                .toLowerCase()
                .indexOf(
                    inputText.toLowerCase()
                ) === 0
        );
    }
}