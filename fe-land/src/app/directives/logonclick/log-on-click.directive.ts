import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[logOnClick]'

})
export class LogOnClickDirective {
  @HostListener('click') onClick() { console.log('Element clicked!'); }

  constructor() { }

}
