import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-create-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  projectService: ProjectService;
  projects: any[];

  testProjects: any[];

  constructor(
    private theProjectService: ProjectService
  ) {
    this.projectService = theProjectService;
    this.projectService.projectsObservable.subscribe(
        projects => {
          this.testProjects = projects;
          console.log('COMPONENT', projects);
        }
    )
  }

  ngOnInit() {
    this.theProjectService.index().subscribe(
      (data) => {
        this.projects = data
      }
    )
  }
}
