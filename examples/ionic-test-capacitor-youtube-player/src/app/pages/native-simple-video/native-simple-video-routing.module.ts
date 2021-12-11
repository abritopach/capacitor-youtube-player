import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NativeSimpleVideoPage } from './native-simple-video.page';

const routes: Routes = [
  {
    path: '',
    component: NativeSimpleVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NativeSimpleVideoPageRoutingModule {}
