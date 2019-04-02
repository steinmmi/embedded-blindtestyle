import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ScreenViewComponent } from './screen-view/screen-view.component';
import { PlayerViewComponent } from './player-view/player-view.component';
import { PhoneGuard } from './phone.guard';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { SortPipe } from './sort.pipe';
import configFile from '../assets/config.json';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { NewMusicComponent } from './config/components/new-music/new-music.component';

const config: SocketIoConfig = { url: configFile.url, options: {query: `path=${window.location.pathname}`} };
@NgModule({
  declarations: [
    AppComponent,
    ScreenViewComponent,
    PlayerViewComponent,
    ScoreBoardComponent,
    SortPipe,
    MusicPlayerComponent,
    NewMusicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [PhoneGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
