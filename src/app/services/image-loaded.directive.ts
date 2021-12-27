import { Directive, Output, EventEmitter, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: 'img[loaded]'
})
export class ImageLoadedDirective {

  @Output() imageLoaded = new EventEmitter();

  @HostListener('load')
  onLoad() {
    this.imageLoaded.emit();
  }

  constructor(private elRef: ElementRef<HTMLImageElement>) {
    if (this.elRef.nativeElement.complete) {
      this.imageLoaded.emit();
    }
  }
}
