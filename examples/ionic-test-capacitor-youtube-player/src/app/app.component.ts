import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    {
      title: 'Simple example',
      url: '/home',
      icon: 'videocam'
    },
    {
      title: 'Video List example',
      url: '/video-list',
      icon: 'list'
    }
  ];

  constructor() {}
}
