import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenViewComponent } from './screen-view/screen-view.component';
import { PlayerViewComponent } from './player-view/player-view.component';
import { PhoneGuard } from './phone.guard';
import { NewMusicComponent } from './config/components/new-music/new-music.component';

const routes: Routes = [
  {path: '', component: ScreenViewComponent},
  {path: 'play', component: PlayerViewComponent, canActivate: [PhoneGuard]},
  {path: 'config', component: NewMusicComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
