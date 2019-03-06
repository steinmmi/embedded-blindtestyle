import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {

  constructor() { }
  players: Array<Object>;

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  ngOnInit() {

    // TODO get players from server
    this.players = [
      {name: "Mathieu", score: 15},
      {name: "Margaux", score: 12},
      {name: "Léo", score: 98},
      {name: "Mathilde", score: 21},
      {name: "Adrien", score: 11},
      {name: "JohnnyYesPapa", score: 25},
    ]
    this.players.sort(function(a, b){
      return a['score']-b['score']
    })
    let colors = ['red','blue','green','purple','gold','orange']
    this.players.map((el) => {
      el['color'] = colors.shift()
    })
  }

}
