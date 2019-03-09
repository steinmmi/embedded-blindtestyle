import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ScreenViewComponent } from './screen-view/screen-view.component';
import { PlayerViewComponent } from './player-view/player-view.component';
import { PhoneGuard } from './phone.guard';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { SortPipe } from './sort.pipe';
import configFile from '../assets/config.json';

<<<<<<< HEAD
const config: SocketIoConfig = { url: configFile.url, options: {query: `path=${window.location.pathname}`} };
=======
const config: SocketIoConfig = { url: 'http://localhost:4200', options: {query:`path=${window.location.pathname}`} };
>>>>>>> abc082001e083f08773545e42d33f5889ac3d709
@NgModule({
  declarations: [
    AppComponent,
    ScreenViewComponent,
    PlayerViewComponent,
    ScoreBoardComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [PhoneGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
