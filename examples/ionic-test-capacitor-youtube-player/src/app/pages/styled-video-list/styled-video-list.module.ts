import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StyledVideoListPageRoutingModule } from './styled-video-list-routing.module';

import { StyledVideoListPage } from './styled-video-list.page';

import { NtkmeButtonModule } from '@ctrl/ngx-github-buttons';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StyledVideoListPageRoutingModule,
    NtkmeButtonModule
  ],
  declarations: [StyledVideoListPage]
})
export class StyledVideoListPageModule {}
