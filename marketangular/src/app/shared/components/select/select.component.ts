import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {

  // @Input(): data come from parent --> AllProductsComponent
  @Input() title : string = "";

  @Input() data : any[] = [];

  // @Output(): data sent from here to parent --> AllProductsComponent
  @Output() selectedValue = new EventEmitter();

  detectChanges(event : any){
    this.selectedValue.emit(event);
  }

}
