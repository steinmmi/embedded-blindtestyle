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

const config: SocketIoConfig = { url: 'http://localhost:4201', options: {} };
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
