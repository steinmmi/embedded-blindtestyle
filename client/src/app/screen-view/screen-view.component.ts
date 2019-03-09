import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Player } from '../player';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss']
})
export class ScreenViewComponent implements OnInit {
  color: string;
  currentPlayer: Player;
  constructor(private socket: Socket) { }

  ngOnInit() {
    this.socket.fromEvent('user_update').subscribe(doc => {
      this.currentPlayer = doc['player'];
      console.log(this.color);
    });

  }

}
