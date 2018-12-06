import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  projectService: ProjectService;
  projects: any[];

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
