import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Player } from './player';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  players: Array<Player> = [];
  player: Subject<Player>;
  constructor(private socket: Socket) {


    this.socket.fromEvent('user_list').subscribe((doc: Array<Player>) => {
      for (const p of doc) {
        this.players.push(p);
      }
    });

    this.socket.fromEvent('user_logon').subscribe((doc: Player) => {
      this.players.push(doc);
      console.log(this.player, this.players);
    });

    this.socket.fromEvent('user_logout').subscribe((doc: Player) => {
      const id = this.findByName(doc);
      this.players.splice(id, 1);
    });

    this.socket.fromEvent('user_update').subscribe(doc => {
      const id = this.findByName(doc['player']);
      this.players[id].score += doc['data']['score'];
    });
  }

  getPlayers() {
    return this.players;
  }

  getPlayer() {
    return this.player;
  }

  findByName({name}) {
    let i = 0;
    let find = false;

    do {
      if (name === this.players[i]['name']) {
        find = true;
      }
      i++;
    } while ( i < this.players.length && !find);
    return find ? i - 1 : -1;
  }
}
