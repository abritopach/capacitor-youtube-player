import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StyledVideoListPage } from './styled-video-list.page';

const routes: Routes = [
  {
    path: '',
    component: StyledVideoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StyledVideoListPageRoutingModule {}
