import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ProjectService } from "src/app/services/project.service";
import {FormControl, FormGroup} from "@angular/forms";
import {TagService} from "src/app/services/tag.service";

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss']
})
export class ProjectManagerComponent implements OnInit {

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
      private theTagService: TagService
  ) {}

  ngOnInit() {
    this.tags=[];
    this.theTagService.index().subscribe(data=>{ this.availableTags = data; });

    this.theRoute.params.subscribe(event => {
      this.id = event.id;


      if (event.id !== 'new'){
        this.theProjectService.show({id: this.id})
            .subscribe((data)=>{
              this.project = data;
              this.projectForm.setValue({
                tags: [],
                name: data.name,
                description: data.description
              });
            })
      } else {
            this.projectForm.setValue({
              tags: [],
              name: '',
              description: ''
            });
      }

    });
  }

  onSubmit = () => {
    const project = {
      ...this.project,
      ...this.projectForm.value,
      
    };
    console.log(project);

    if(project.id){
      this.theProjectService.update(project).subscribe((this.afterSubmit));
    }
    else {
      this.theProjectService.create( this.projectForm.value )
          .subscribe(this.afterSubmit)
    }
  };



  afterSubmit(data : any){
    console.log(this.id, data)
  }

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
