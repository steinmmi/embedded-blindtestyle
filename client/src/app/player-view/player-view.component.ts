import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  constructor(private socket: Socket) { }

  ngOnInit() {
  }

  onBuzzerClick(a) {
    console.log(a.target);

    a.target.classList.add('active');
    this.socket.emit('push');
    setTimeout(() => {a.target.classList.remove('active'); }, 200);

  }

}
