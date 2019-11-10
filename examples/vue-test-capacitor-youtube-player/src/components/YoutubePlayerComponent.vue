<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / use capacitor youtube player,<br>
      check out the
      <a href="https://github.com/abritopach/capacitor-youtube-player" target="_blank" rel="noopener">capacitor-youtube-player documentation</a>.
    </p>
    <!-- The <iframe> (and video player) will replace this <div> tag. -->
    <div id="youtube-player"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { YoutubePlayerWeb } from 'capacitor-youtube-player';

import { Plugins, Capacitor } from '@capacitor/core';

@Component
export default class YoutubePlayerComponent extends Vue {
  @Prop() private msg!: string;

  constructor() {
    super();
    console.log('YoutubePlayerComponent::constructor() | method called');
  }

  created() {
      console.log('YoutubePlayerComponent::created() | method called');
  }

  mounted() {
      console.log('YoutubePlayerComponent::mounted() | method called');
      if (Capacitor.platform === 'web') {
        this.initializeYoutubePlayerPluginWeb();
      } else { // Native
        this.initializeYoutubePlayerPluginNative();
      }
  }

  async initializeYoutubePlayerPluginWeb() {
    console.log('YoutubePlayerComponent::initializeYoutubePlayerPluginWeb() | method called');
    const options = {playerId: 'youtube-player', playerSize: {width: 640, height: 360}, videoId: 'tDW2C6rcH6M', debug: true};
    const result = await YoutubePlayerWeb.initialize(options);
    console.log('playerReady', result);

    (result as any).player.addEventListener('onPlaybackQualityChange', (event: any) => {
      console.log('playback quality is', event);
    });

    (result as any).player.addEventListener('onStateChange', (event: any) => {
      console.log('state is', event);
    });
  }

  async initializeYoutubePlayerPluginNative() {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
