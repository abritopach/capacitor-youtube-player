import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { NativeSimpleVideoPageRoutingModule } from './native-simple-video-routing.module';

import { NativeSimpleVideoPage } from './native-simple-video.page';

@NgModule({
  imports: [
    SharedModule,
    NativeSimpleVideoPageRoutingModule
  ],
  declarations: [NativeSimpleVideoPage]
})
export class NativeSimpleVideoPageModule {}
