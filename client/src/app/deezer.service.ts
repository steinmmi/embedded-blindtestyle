import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {

  constructor(private http: HttpClient) { }
  serverUrl = 'http://127.0.0.1:4201';
  searchTrack(q: string) {
    const urlQuery = `${this.serverUrl}/deezer/search?q=${q}`;
    return this.http.get(urlQuery);
  }
  getAlbumInfos(id: number) {
    const urlQuery = `${this.serverUrl}/deezer/album/${id}`;
    return this.http.get(urlQuery);
  }
}
