import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls
  : ['./splash-screen.component.scss'],
  animations: [
    trigger('show', [
      state('hidden', style({
        opacity: '0'
      })),
      state('shown', style({
        opacity: '1'
      })),
      transition('hidden=>shown', animate('500ms')),
      transition('shown=>hidden', animate('500ms'))
    ]),
  ]
})
export class SplashScreenComponent implements OnInit {
  src: string;

  falseSrc = "/assets/img/cross.png";
  trueSrc = "/assets/img/check.png";
  constructor() { }
  currentState = 'hidden';

  appear(state) {
    this.src = state ? this.trueSrc : this.falseSrc;
    this.currentState = 'shown';
    setTimeout(() => {
      this.currentState = 'hidden';
    }, 800);
  }
  ngOnInit() {
  }

}
