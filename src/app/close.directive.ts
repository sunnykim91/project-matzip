import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appClose]'
})
export class CloseDirective implements AfterViewInit {

  constructor(public el:ElementRef) { }

  ngAfterViewInit(): void {
    console.log(this.el);
    
  }

}
