import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { YoutubePlayer } from '../../../../../../dist/esm';
import { IPlayerNativeOptions } from '../../../../../../dist/esm/web/models/models';

@Component({
  selector: 'app-native-simple-video',
  templateUrl: './native-simple-video.page.html',
  styleUrls: ['./native-simple-video.page.scss'],
})
export class NativeSimpleVideoPage implements OnInit, AfterViewInit {

  currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (Capacitor.getPlatform() !== 'web') {
      this.initializeYoutubePlayerPluginNative();
    }
  }

  async initializeYoutubePlayerPluginNative() {
    const options: IPlayerNativeOptions = {playerSize: {width: 320, height: 320}, videoId: 'tDW2C6rcH6M'};
    const playerReady = await YoutubePlayer.initialize(options);
    console.log('playerReady', playerReady);
  }

  async playVideo() {}


}
