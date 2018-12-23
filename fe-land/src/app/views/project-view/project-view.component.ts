import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  projectService: ProjectService;
  projects: any[];
  router: Router;

  testProjects: any[];

  constructor(
      private theRouter: Router,
    private theProjectService: ProjectService
  ) {
    this.projectService = theProjectService;
    this.router = theRouter;
    this.projectService.projectsObservable.subscribe(
        projects => {
          this.testProjects = projects;
          console.log('COMPONENT', projects);
        }
    )
  }

  openProject = (projectId: number) => {
      this.router.navigate([`/project/${projectId}`]);
  };

  ngOnInit() {
    this.theProjectService.index().subscribe(
      (data) => {
        this.projects = data
      }
    )
  }
}
