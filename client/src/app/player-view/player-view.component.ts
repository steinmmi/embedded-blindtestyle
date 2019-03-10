import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  player: Object;
  players: Array<Object>;

  constructor(private socket: Socket, private socketService: SocketService) { }

  ngOnInit() {

    this.socketService.getConnectionInfo().subscribe(doc => {
      this.player = doc;
    });
  }
  goFullscreen() {
    document.querySelector('body').requestFullscreen();
  }
  onBuzzerClick(a) {
    a.target.classList.add('active');
    this.socket.emit('push');
    setTimeout(() => {a.target.classList.remove('active'); }, 200);

  }

}
