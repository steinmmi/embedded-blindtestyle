import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { DeezerService } from 'src/app/deezer.service';
import { TimeInterval } from 'rxjs';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  constructor(private deezer: DeezerService) { }
  @Input() query: string;

  results = [];
  changeTimeout: any;
  ngOnChanges(changes: SimpleChanges): void {

    if (this.changeTimeout) { clearTimeout(this.changeTimeout); }
    this.changeTimeout = setTimeout(() => {
      console.log('sending');
      
      const newValue = changes.query.currentValue;
      if (!newValue) {return;};
      this.deezer.searchTrack(newValue).subscribe((val: Array<any>) => {
        if (val) {
          val.forEach((elem, index) => {
            this.results[index] = {
              title: elem.title,
              artist: elem.artist,
              date: elem.release_date,
              preview: elem.preview
            };
            this.deezer.getAlbumInfos(elem.album.id).subscribe((album: any) => {
              this.results[index].cover = album.cover;
            });
          });

        }
      });
    }, 500);
  }
  ngOnInit() {
  }

  pauseAudios(ev) {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => { if (audio !== ev.target) { audio.pause(); } });
  }
}
