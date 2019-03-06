import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  player: Object;
  players: Array<Object>;

  constructor(private socket: Socket, private playersService: PlayersService) { }

  ngOnInit() {
    this.socket.fromEvent('login_data').subscribe(doc => {
      this.player = doc;
    });
  }


  onBuzzerClick(a) {
    console.log(a.target);

    a.target.classList.add('active');
    this.socket.emit('push');
    setTimeout(() => {a.target.classList.remove('active'); }, 200);

  }

}
