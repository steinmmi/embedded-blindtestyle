import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenViewComponent } from './screen-view/screen-view.component';

const routes: Routes = [
  {path: '', component: ScreenViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
