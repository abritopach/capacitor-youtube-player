import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { VideoListPageRoutingModule } from './video-list-routing.module';

import { VideoListPage } from './video-list.page';

@NgModule({
  imports: [
    SharedModule,
    VideoListPageRoutingModule
  ],
  declarations: [VideoListPage]
})
export class VideoListPageModule {}
