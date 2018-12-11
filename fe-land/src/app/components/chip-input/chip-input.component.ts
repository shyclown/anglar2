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
    @Input() values: any;
    @Input() getDataValue: (data: any) => any;
    @Input() getDataIndexValue: (data: any) => any;

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
        if( this.getDataValue ){ return this.getDataValue(rawValue) }
        else { return rawValue; }
    }
    setValue(rawInput){
        if( true ){ return {id:0, name: rawInput} }
        else{ return rawInput }
    }



    filteredData: Observable<Tag[]>;
    selectedData: Tag[] = [{id:1, name: "Apple"}];
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

            console.log('add = input', input);
            console.log('add = value', value);

            /* Do not add values twice */
            if(
                this.selectedData.filter(selected =>
                    this.getDataValue(selected) === value.trim()
                ).length > 0
            ){
                // Do nothing
            }
            else if ((value || '').trim()) {
                this.selectedData.push(this.setValue(value.trim()));
            }

            if (input) {
                input.value = '';
            }

            this.localCtrl.setValue(null);
            console.log('add = selected', this.selectedData);
            this.setFormGroupValue(this.selectedData);
        //}
    }

    remove(data: string): void {
        const index = this.selectedData.indexOf(data);
        if (index >= 0) {
            this.selectedData.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        console.log('selected == event.option.value' , event.option.value);
        this.selectedData.push(event.option.value);
        this.dataInput.nativeElement.value = '';
        this.localCtrl.setValue(null);
        console.log(this.localCtrl.value);
        console.log(this.dataInput.nativeElement.value);
    }

    /* Filter in select based on input */
    private _filter(inputText: string): Tag[] {
        console.log('filter ==', inputText);
        const filterValue = inputText.toLowerCase();
        return this.allData.filter(data =>
            this.getDataValue(data).toLowerCase().indexOf(filterValue) === 0
        );
    }
}