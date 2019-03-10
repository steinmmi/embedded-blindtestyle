import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
  @Output() playerEvent = new EventEmitter();
  playing: boolean;
  constructor(private socketService: SocketService) { }
  audio: HTMLAudioElement;
  ngOnInit() {
    this.createAudio('/assets/music.mp3');
  }

  createAudio(src) {
    if (!this.audio) {
      this.audio = new Audio();
    }
    this.audio.src = src;
  }

  fadeOut() {
    const fadeAudio = setInterval(() => {
      if (this.audio.volume > 0.0) {
        this.audio.volume -= 0.1;
      }
      if (this.audio.volume <= 0.1) {
          this.audio.pause();
          this.playerEvent.emit('nextMusic');
          clearInterval(fadeAudio);
      }
  }, 200);
  }
  playAudio() {
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        this.playing = true;
      })
      .catch(error => {
        this.playing = false;
        console.error(error);
      });
    }
  }
}
