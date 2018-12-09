import {Component, OnInit} from '@angular/core';
import { ProjectService } from "src/app/services/project.service";
import {
    FormControl,
    FormGroup
} from "@angular/forms";


@Component({
    selector: 'app-tag-form',
    templateUrl: './app-tag-form.component.html',
    styleUrls: ['./app-tag-form.component.scss']
})

export class TagFormComponent implements OnInit
{
    projectService: ProjectService;
    projects: any[];

    projectForm = new FormGroup({
        name: new FormControl(),
        description: new FormControl()
    });

    onSubmit = () => {
        this.projectService.create(
            this.projectForm.value
        ).subscribe((response)=>{
            console.log(response)
        })
    };

    options: string[] = ['One', 'Two', 'Three'];

    constructor(
        private theProjectService: ProjectService
    ) {
        this.projectService = theProjectService;
    }

    ngOnInit() {
        this.theProjectService.index().subscribe(
            (data) => {
                this.projects = data
            }
        )
    }
}
