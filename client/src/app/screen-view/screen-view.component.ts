import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Player } from '../player';
import { SocketService } from '../socket.service';
import { MusicPlayerComponent } from '../music-player/music-player.component';
import { SplashScreenComponent } from '../splash-screen/splash-screen.component';
import { HttpClient } from '@angular/common/http';

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
  win: boolean;
  song: any;
  constructor(private socketService: SocketService) { }

  ngOnInit() {
this.socketService.nextMusic();

    this.socketService.hasPushed().subscribe((player: Player) => {
      this.currentPlayer = player;
      this.mplayer.fadeOut(.5).then(() => {
        this.mplayer.audio.pause();
      });
    });

    this.socketService.nextMusicSignal().subscribe((song: any)  => {
        this.mplayer.audio.src = `http://localhost:4201/song/get/${song._id}`;
        this.win = false;
        setTimeout(() => {
          this.song = song;
          this.mplayer.playAudio();
          this.mplayer.fadeIn();
      }, 1000);
    });

    this.socketService.waitForAnswer().subscribe((data) => {
      this.currentPlayer = null;

      const answerAudio =  new Audio();
      answerAudio.src = data['correct'] ? '/assets/right_answer.mp3' : '/assets/wrong_answer.mp3';
      answerAudio.play();
      this.mplayer.fadeIn();

      this.mplayer.audio.play();
      this.splashscreen.appear(data['correct'])
      if (data['correct']) {
        this.win = true;
        setTimeout(() => {
          this.mplayer.fadeOut().then(() => {
            this.win = false;
            this.socketService.nextMusic();
          });
        }, 10000);
      }
    });

  }

}
