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
    this.createAudio('/assets/music1.mp3');
  }

  createAudio(src) {
    if (!this.audio) {
      this.audio = new Audio();
    }
    this.audio.src = src;
  }

  fadeOut(time = 20) {
    return new Promise((resolve, reject) => {
      const fadeAudio = setInterval(() => {
      if (this.audio.volume > 0.1) {
            this.audio.volume -= 0.1;
      }
      if (this.audio.volume <= 0.1) {
          this.audio.pause();
          clearInterval(fadeAudio);
          resolve();
      }
    }, time * 0.100);
  });
  }

  fadeIn(time = 20) {
    return new Promise((resolve, reject) => {
      const fadeAudio = setInterval(() => {
      if (this.audio.volume < 1) {
            this.audio.volume += 0.1;
      }
      if (this.audio.volume >= 0.9) {
          clearInterval(fadeAudio);
          resolve();
      }
    }, time * 0.100);
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
