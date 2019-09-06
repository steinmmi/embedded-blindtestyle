import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  links = [
    {
      name: 'Ajout de musique',
      url: ['./new-music']
    }
  ];
  ngOnInit() {
  }

}
