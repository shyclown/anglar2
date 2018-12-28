import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ProjectService } from "../../../services/project.service";
import {FormControl, FormGroup} from "@angular/forms";

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
  @Input() project: any;

  constructor(
      private theRoute: ActivatedRoute,
      private theProjectService: ProjectService
  ) {
    /*
      if(this.project){
        this.projectForm.setValue({
          name: this.project.name,
          description: this.project.description
        });
      }
      */
  }

  ngOnInit() {

    this.theRoute.params.subscribe(event => {
      this.id = event.id;

      console.log(this.id);

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

    console.log(this.projectForm.value);


    this.theProjectService.create(
        this.projectForm.value
    ).subscribe((response)=>{
      console.log(response)
    })
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

  availableTags : any[] = [
    {id: 1, name: 'tag1'},
    {id: 4, name: 'tag2'},
    {id: 6, name: 'tag3'},
    {id: 8, name: 'tag4'},
  ];

  options: string[] = ['One', 'Two', 'Three'];

}
