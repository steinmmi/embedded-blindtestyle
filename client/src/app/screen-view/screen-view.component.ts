import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Player } from '../player';
import { SocketService } from '../socket.service';
import { MusicPlayerComponent } from '../music-player/music-player.component';
import { SplashScreenComponent } from '../splash-screen/splash-screen.component';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss']
})
export class ScreenViewComponent implements OnInit {
  @ViewChild(MusicPlayerComponent) mplayer: MusicPlayerComponent;
  @ViewChild(SplashScreenComponent) splashscreen: SplashScreenComponent;
  color: string;
  currentPlayer: Player;
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.getUserUpdate().subscribe(doc => {
      this.currentPlayer = doc['player'];
      this.mplayer.fadeOut(0.5).then(() => {
        this.mplayer.audio.pause();
      });
    });

    this.socketService.nextMusicSignal().subscribe(val => {
      this.mplayer.audio.src = `/assets/music${val}.mp3`;
      setTimeout(() => {
        this.mplayer.fadeIn();
      this.mplayer.playAudio();
      }, 1000);
    });

    setTimeout(() => {
      this.mplayer.playAudio();
    }, 1000);
    this.socketService.waitForAnswer().subscribe((data) => {
      this.currentPlayer = null;

      const answerAudio =  new Audio();
      answerAudio.src = data['correct'] ? '/assets/right_answer.mp3' : '/assets/wrong_answer.mp3';
      answerAudio.play();
      this.mplayer.fadeIn(1)
      this.mplayer.audio.play();
      this.splashscreen.appear(data['correct'])
      if (data) {
        setTimeout(() => {
          this.mplayer.fadeOut(2).then(() => {
            this.socketService.nextMusic();
          });
        }, 10000);
      }
    });

  }

}
