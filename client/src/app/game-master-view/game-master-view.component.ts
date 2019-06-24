import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-game-master-view',
  templateUrl: './game-master-view.component.html',
  styleUrls: ['./game-master-view.component.scss']
})
export class GameMasterViewComponent implements OnInit {

  constructor(private socket: Socket) { }
  title: string;
  artist: string;
  ngOnInit() {
    this.socket.fromEvent('music:next').subscribe((song: any) => {
      console.log('oui');
      
      this.title = song.title;
      this.artist = song.artist;
    })
  }

  send(state) {
    this.socket.emit('isGoodAnswer', state);
  }
}
