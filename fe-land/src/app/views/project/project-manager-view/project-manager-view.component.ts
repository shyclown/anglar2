import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ProjectService } from "src/app/services/project.service";
import { FormControl, FormGroup } from "@angular/forms";
import {TagService} from "src/app/services/tag.service";

@Component({
    selector: 'app-project-manager',
    templateUrl: './project-manager-view.component.html',
    styleUrls: ['./project-manager-view.component.scss']
})
export class ProjectManagerViewComponent implements OnInit {

    id:any;

    projectForm = new FormGroup({
        name: new FormControl(),
        description: new FormControl(),
        tags: new FormControl()
    });

    tags: any[];
    availableTags : any[] = [];

    @Input() project: any;

    constructor(
        private theRoute: ActivatedRoute,
        private theProjectService: ProjectService,
        private theTagService: TagService,
        private theRouter: Router,
    ) {}

    backToProjects = () => {

        this.theRouter.navigate([`/project`]);
    }

    handleDeleteProject = () => {
        console.log('delete');
        this.theProjectService.delete(this.project).subscribe(
            this.backToProjects
        );
    }

    ngOnInit() {
        this.tags=[];
        this.theTagService.index().subscribe(data=>{ this.availableTags = data; });

        this.theRoute.params.subscribe(event => {
            this.id = event.id;
            event.id !== 'new' ?
                this.theProjectService.show({id: this.id})
                    .subscribe((data)=>{
                        this.project = data;
                        this.tags = data.item.tags;

                        this.projectForm.setValue({
                            tags: data.item.tags,
                            name: data.name,
                            description: data.description
                        });
                    })
            :
                this.projectForm.setValue({
                    tags: [],
                    name: '',
                    description: ''
                });

        });
    }

    onSubmit = () => {
        const project = {
            ...this.project,
            ...this.projectForm.value,
        };
        if(project.id){
            this.theProjectService.update(project).subscribe((this.afterSubmit));
        }
        else {
            this.theProjectService.create( this.projectForm.value )
                .subscribe(this.afterSubmit)
        }
    };

    afterSubmit = (data : any) => {
       this.backToProjects();
    };

    getTagValue = (tag) => {
        return tag.name;
    };
    setTagValue = (inputText) => {
        return {name: inputText}
    };
    getTagIndexValue = (tag) => {
        return tag.id;
    };




}
