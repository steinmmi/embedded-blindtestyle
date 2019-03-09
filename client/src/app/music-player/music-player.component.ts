import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {


  playing: boolean;
  constructor() { }
  audio: HTMLAudioElement;
  ngOnInit() {
    this.createAudio();
  }

  createAudio() {
    this.audio = new Audio();
    this.audio.src = '/assets/music.mp3';
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
