import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";

import {TagService} from "src/app/services/tag.service";

class Tag{
    [key: string]: any
}

@Component({
    selector: 'app-tag-view',
    templateUrl: './tag-view.component.html',
    styleUrls: ['./tag-view.component.scss']
})
export class TagViewComponent implements OnInit {

    id: number;
    tag: Tag;

    constructor(
        private theRouter: Router,
        private theRoute: ActivatedRoute,
        private theTagService : TagService
    ) {

    }

    ngOnInit() {

        this.theRoute.params.subscribe(event => {
            this.id = event.id;

                this.theTagService.show({id: this.id})
                    .subscribe((data)=>{
                        this.tag = data;
                    })


        });
    }

}