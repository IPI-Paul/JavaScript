import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRedBlack]'
})
export class RedblackDirective {

  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.style.color = 'white';    
    elementRef.nativeElement.style.background = 'black';     
  }

  ngOnInit() {
    this.elementRef.nativeElement.innerText += ' - rendered by appRedBlack'; 
  }
}
