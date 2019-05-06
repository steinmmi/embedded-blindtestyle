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

  // TODO : use local assets
  falseSrc = "http://pngriver.com/wp-content/uploads/2018/04/Download-Red-Cross-PNG-File.png";
  trueSrc = "https://cdn.pixabay.com/photo/2013/07/13/10/48/check-157822_960_720.png";
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
