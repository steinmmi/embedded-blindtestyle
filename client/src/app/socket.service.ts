import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Player } from './player';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  players: Array<Player> = [];
  player: BehaviorSubject<Player> = new BehaviorSubject<Player>(null);
  constructor(private socket: Socket, private router: Router) {

    this.socket.fromEvent('change:turn').subscribe((link) => {
        if(link) this.router.navigate(['/gm']);
        else this.router.navigate(['/play']);
    })
    this.socket.fromEvent('user_list').subscribe((doc: Array<Player>) => {
      for (const p of doc) {
        this.players.push(p);
      }
    });

    this.socket.fromEvent('user_logon').subscribe((doc: Player) => {
      this.players.push(doc);
    });

    this.socket.fromEvent('user_logout').subscribe((doc: Player) => {
      const id = this.findByName(doc);
      this.players.splice(id, 1);
    });

    this.socket.fromEvent('user_update').subscribe(doc => {
      const id = this.findByName(doc['player']);
      this.players[id].score += doc['data']['score'];
    });

    this.socket.fromEvent('login_data').subscribe((data:Player) => {
        this.player.next(data);
    })
  }

  getPlayers() {
    return this.players;
  }

  getPlayer() {
    return this.player;
  }

  getConnectionInfo() {
    return this.socket.fromEvent('login_data');
  }

  getUserUpdate() {
    return this.socket.fromEvent('user_update');
  }

  hasPushed() {
      return this.socket.fromEvent('pushed');
  }

  waitForAnswer() {
    return this.socket.fromEvent('answer');
  }

  nextMusic() {
    this.socket.emit('music:next');
  }
  nextMusicSignal() {
    return this.socket.fromEvent('music:next')
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
