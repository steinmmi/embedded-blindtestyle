import { Component, OnInit } from '@angular/core';
import { SongForm } from '../../song-form';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-music',
  templateUrl: './new-music.component.html',
  styleUrls: ['./new-music.component.scss']
})
export class NewMusicComponent implements OnInit {

  constructor(private http: HttpClient) { }
  types = [
    'Rock',
    'Pop',
    'Rap',
    'Bande originale',
    'Jazz',
    'Dessin animé'
  ];

  music = new SongForm();

  ngOnInit() {
  }

  add() {
    if(this.music.file === undefined || this.music.file === null ||
      this.music.artist === undefined || this.music.artist.length === 0 ||
      this.music.title === undefined || this.music.title.length === 0 ||
      this.music.year === undefined || this.music.year.length === 0 ||
      this.music.type === undefined || this.music.type.length === 0 ) {
        return;
      }
    const formData = new FormData();
    formData.append('file', this.music.file);
    formData.append('artist', this.music.artist);
    formData.append('title', this.music.title);
    formData.append('year', this.music.year);
    formData.append('type', this.music.type);

    this.http.post('http://127.0.0.1:4201/song/add', formData).subscribe((val) => {
      console.log(val);
    });
  }

  onFileChange(event) {
    this.music.file = event.target.files[0];
  }
}
