import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../services/project.service";
import {Router, ActivatedRoute} from "@angular/router";
// TODO : fix scrolling
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
        console.log(projectId);
        this.router.navigate([`/project/${projectId}`]);
    };
    openTag = (tagId: number) => {
        this.router.navigate([`/tag/${tagId}`]);
    };

    createProject = () => {
        console.log('new');
        this.router.navigate([`/project/new`]);
    };

    ngOnInit() {
        this.theProjectService.index().subscribe(
            (data) => {
                this.projects = data
            }
        )
    }
}
