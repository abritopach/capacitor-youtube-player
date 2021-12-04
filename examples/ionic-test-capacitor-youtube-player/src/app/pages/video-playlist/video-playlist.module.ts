import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoPlaylistPageRoutingModule } from './video-playlist-routing.module';

import { VideoPlaylistPage } from './video-playlist.page';

@NgModule({
  imports: [
    SharedModule,
    VideoPlaylistPageRoutingModule
  ],
  declarations: [VideoPlaylistPage]
})
export class VideoPlaylistPageModule {}
