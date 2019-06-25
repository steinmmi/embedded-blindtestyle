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
    this.createAudio();
  }

  createAudio() {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.volume = 0;
    }
  }

  fadeOut(time = 1) {
    return new Promise((resolve, reject) => {
      const fadeAudio = setInterval(() => {
      if (this.audio.volume > 0.1) {
            this.audio.volume -= 0.1;
      } else if (this.audio.volume > 0.01) {
        this.audio.volume -= 0.01;
      } else {
          this.audio.pause();
          clearInterval(fadeAudio);
          resolve();
      }
      }, time * 100);
  });
  }

  fadeIn(time = 1) {
    return new Promise((resolve, reject) => {
      const fadeAudio = setInterval(() => {
      if (this.audio.volume < 1) {
            this.audio.volume += 0.1;
      }
      if (this.audio.volume >= 0.9) {
          clearInterval(fadeAudio);
          resolve();
      }
      }, time * 100);
  });
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
