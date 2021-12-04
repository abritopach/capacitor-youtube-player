import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { StyledVideoListPageRoutingModule } from './styled-video-list-routing.module';

import { StyledVideoListPage } from './styled-video-list.page';

@NgModule({
  imports: [
    SharedModule,
    StyledVideoListPageRoutingModule
  ],
  declarations: [StyledVideoListPage]
})
export class StyledVideoListPageModule {}
