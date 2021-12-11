import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'video-list',
    loadChildren: () => import('./pages/video-list/video-list.module').then( m => m.VideoListPageModule)
  },
  {
    path: 'styled-video-list',
    loadChildren: () => import('./pages/styled-video-list/styled-video-list.module').then( m => m.StyledVideoListPageModule)
  },
  {
    path: 'video-playlist',
    loadChildren: () => import('./pages/video-playlist/video-playlist.module').then( m => m.VideoPlaylistPageModule)
  },
  {
    path: 'native-simple-video',
    loadChildren: () => import('./pages/native-simple-video/native-simple-video.module').then( m => m.NativeSimpleVideoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
