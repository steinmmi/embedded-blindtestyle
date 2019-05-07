import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-game-master-view',
  templateUrl: './game-master-view.component.html',
  styleUrls: ['./game-master-view.component.scss']
})
export class GameMasterViewComponent implements OnInit {

  constructor(private socket: Socket) { }

  ngOnInit() {
      
  }

  send(state) {
    this.socket.emit('isGoodAnswer', state);
  }
}
