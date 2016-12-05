import {Directive, HostListener, HostBinding} from '@angular/core';

@Directive({
  selector: '[prdropdown]'
})
export class DropdownDirective {

  isOpen: boolean = false;

  @HostListener('click') openMenu(){
    this.isOpen = true;
  }

  @HostListener('mouseleave') closeMenu(){
    this.isOpen = false;
  }

  @HostBinding('class.open') get setValue(){
    return this.isOpen;
  }

}
