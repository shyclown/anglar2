import { Component, OnInit } from '@angular/core';
import { ProjectService } from "src/app/services/project.service";
import { FormControl, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.scss']
})
export class CreateProjectFormComponent implements OnInit {
  projectService: ProjectService;
  projects: any[];

  projectForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    chips: new FormControl()
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
