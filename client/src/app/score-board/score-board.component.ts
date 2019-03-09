import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {

  constructor(private socketService: SocketService) { }
  players: Array<Object>;

  ngOnInit() {

    this.players = this.socketService.getPlayers();
  }

}
