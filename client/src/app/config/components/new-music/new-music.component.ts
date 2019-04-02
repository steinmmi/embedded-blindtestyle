import { Component, OnInit } from '@angular/core';
import { SongForm } from '../../song-form';

@Component({
  selector: 'app-new-music',
  templateUrl: './new-music.component.html',
  styleUrls: ['./new-music.component.scss']
})
export class NewMusicComponent implements OnInit {

  constructor() { }
  types = [
    'Rock',
    'Pop',
    'Rap',
    'Bande originale',
    'Jazz',
    'Dessin animé'
  ];

  music = new SongForm('', '', 2019, 'cc', null);

  ngOnInit() {
  }

  add() {
    console.log(this.music);
  }

  onFileChange(event) {
    this.music.setSong(event.target.files);
    console.log(this.music);
  }
}
