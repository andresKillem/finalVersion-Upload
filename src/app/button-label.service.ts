import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonLabelService {

  btn1Label: BehaviorSubject<string>;
  btn2Label: BehaviorSubject<string>;
  btn3Label: BehaviorSubject<string>;
  btn4Label: BehaviorSubject<string>;


  constructor() {
    this.btn1Label = new BehaviorSubject('Concept Video');
    this.btn2Label = new BehaviorSubject('Video Production');
    this.btn3Label = new BehaviorSubject('Design Brief');
    this.btn4Label = new BehaviorSubject('Progress Drawings');
   }

  // Update button label.
  updateButtonLabel(btn: string, btnLabel: string): void {
    switch(btn.toLowerCase()) {
      case 'btn1': 
                  this.btn1Label.next(btnLabel);
                  break;
      case 'btn2': 
                  this.btn2Label.next(btnLabel);
                  break;
      case 'btn3': 
                  this.btn3Label.next(btnLabel);
                  break;
      case 'btn4':
                  this.btn4Label.next(btnLabel);
                  break;
      default: 
                  console.log(`Invalid Button: ${btn}`);
    }
  } 
}
