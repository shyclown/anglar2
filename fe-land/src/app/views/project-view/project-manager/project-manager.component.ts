import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ProjectService } from "../../../services/project.service";

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss']
})
export class ProjectManagerComponent implements OnInit {

  id:any;

  constructor(
      private theRoute: ActivatedRoute,
      private theProjectService: ProjectService
  ) {

  }

  ngOnInit() {
    this.theRoute.params.subscribe(event => {
      this.id = event.id;
      this.theProjectService.show({id: this.id}).subscribe((data)=>{
        console.log(data);
      })
    });
  }

}
