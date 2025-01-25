import { AfterViewInit, inject } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMyAutofocus]'
})
export class MyAutofocusDirective implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
}
