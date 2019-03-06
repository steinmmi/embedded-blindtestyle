import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {

  constructor(private playersService: PlayersService) { }
  players: Array<Object>;

  ngOnInit() {

    this.players = this.playersService.getPlayers();
  }

}
