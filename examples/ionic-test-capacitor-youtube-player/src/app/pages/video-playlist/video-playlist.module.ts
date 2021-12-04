import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoPlaylistPageRoutingModule } from './video-playlist-routing.module';

import { VideoPlaylistPage } from './video-playlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoPlaylistPageRoutingModule
  ],
  declarations: [VideoPlaylistPage]
})
export class VideoPlaylistPageModule {}
