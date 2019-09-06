import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  constructor() { }
  @Input() result: any;
  ngOnInit() {
  }

  pauseAudios(ev) {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => { if (audio !== ev.target) { audio.pause(); } });
  }
}
