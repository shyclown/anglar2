import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { InitService } from "../explorer/service/init.service";

@Injectable()
export class ResolveApi implements Resolve<InitService> {
    constructor(
        private initService: InitService
    ) {}
    resolve() {
        return this.initService.setToken();
    }
}