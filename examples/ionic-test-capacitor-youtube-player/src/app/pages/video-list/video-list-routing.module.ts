import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoListPage } from './video-list.page';

const routes: Routes = [
  {
    path: '',
    component: VideoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoListPageRoutingModule {}
