import { Component, OnInit } from '@angular/core';
import { SongForm } from '../../song-form';
import { HttpClient } from '@angular/common/http';
import { DeezerService } from 'src/app/deezer.service';

@Component({
  selector: 'app-new-music',
  templateUrl: './new-music.component.html',
  styleUrls: ['./new-music.component.scss']
})
export class NewMusicComponent implements OnInit {

  constructor(private http: HttpClient, private deezer: DeezerService) { }
  types = [
    'Rock',
    'Pop',
    'Rap',
    'Bande originale',
    'Jazz',
    'Dessin animé'
  ];

  results = [];
  changeTimeout: any;
  music = new SongForm();

  ngOnInit() {
  }

  searchChange() {
    const value = this.music.title;
    if (this.changeTimeout) { clearTimeout(this.changeTimeout); }
    this.changeTimeout = setTimeout(() => {
      const newValue = value;
      if (!newValue) {return; }
      this.deezer.searchTrack(newValue).subscribe((val: Array<any>) => {
        if (val) {
          val.forEach((elem, index) => {
            this.results[index] = {
              title: elem.title,
              artist: elem.artist,
              preview: elem.preview,
            };
            this.deezer.getAlbumInfos(elem.album.id).subscribe((album: any) => {
              this.results[index].cover = album.cover;
              this.results[index].date = album.release_date;
            });
          });

        }
      });
    }, 500);
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

  setForm(val) {
    this.music.title = val.title;
    this.music.artist = val.artist.name;
    this.music.year = val.date.split('-')[0];
  }
  onFileChange(event) {
    this.music.file = event.target.files[0];
  }
}
