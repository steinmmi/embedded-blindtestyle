import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Player } from '../player';
import { SocketService } from '../socket.service';
import { MusicPlayerComponent } from '../music-player/music-player.component';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss']
})
export class ScreenViewComponent implements OnInit {
  @ViewChild(MusicPlayerComponent) mplayer: MusicPlayerComponent;
  color: string;
  currentPlayer: Player;
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.getUserUpdate().subscribe(doc => {
      this.currentPlayer = doc['player'];
      this.mplayer.audio.pause();
    });

    setTimeout(() => {
      this.mplayer.playAudio();
    }, 1000);
    this.socketService.waitForAnswer().subscribe((data) => {
      this.currentPlayer = null;

      const answerAudio =  new Audio();
      answerAudio.src = data['correct'] ? '/assets/right_answer.mp3' : '/assets/wrong_answer.mp3';
      answerAudio.play();
      this.mplayer.audio.play();
      if (data['correct']) {
        setTimeout(() => {
          this.mplayer.fadeOut();
        }, 10000);
      }
    });

  }
  nextMusic() {

  }

  eventHandler(event) {
    switch (event) {
      case 'nextMusic':
        this.nextMusic();
        break;
    }
  }

}
