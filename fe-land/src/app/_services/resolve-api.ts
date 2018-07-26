import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import {InitService} from "../explorer/service/init.service";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class ResolveApi implements Resolve<Observable<string>> {
    constructor(private initService: InitService) {}

    resolve() {
        console.log(this.initService);
        return this.initService;
    }
}