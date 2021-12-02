import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { YoutubePlayer } from 'capacitor-youtube-player';
import { IPlayerOptions } from 'capacitor-youtube-player/dist/esm/web/models/models';

@Component({
  selector: 'app-styled-video-list',
  templateUrl: './styled-video-list.page.html',
  styleUrls: ['./styled-video-list.page.scss'],
})
export class StyledVideoListPage implements OnInit, AfterViewInit {

  currentYear = new Date().getFullYear();

  videos = [
    {id: 'youtube-player-11', videoId: 'aafHvwRU-BU', title: 'Opening Keynote | Max Lynch | Ioniconf 2021',
    description: 'Max Lynch, Co-founder and CEO of Ionic, shares product updates and the latest details all things Ionic.',},
    {id: 'youtube-player-12', videoId: 'HampVpMVL4I', title: 'Ionic, Built for Speed | Maksymilian Majer | Ioniconf 2021',
    description: 'Maksymilian Majer, CEO at ITCraftship, talks about how the Ionic stack compares to other popular cross-platform solutions. He discusses the importance of striking the right balance between time-to-market, seamless customer experience across multiple platforms, and cost savings when choosing the right solution.'},
    {id: 'youtube-player-13', videoId: 'Kf7o9DMc14Q', title: 'Testing Stencil at the Speed of Light | Tally Barak | Ioniconf 2021',
    description: 'Senior full stack developer at Yoobic with over 30 years of experience in different areas of software, including product management, consulting, devops and of course - development. At recent years I focus on Javascript and its amazing eco-system.'},
    {id: 'youtube-player-14', videoId: 'n6qYxcRJHmk', title: 'Design Matters, Tips and Tricks to Make Your App Shine | Alan Montgomery | Ioniconf 2021',
    description: 'Alan is a senior developer working for Idox Group as a Mobile Team Lead. Based in Belfast, Northern Ireland, Alan like to work with ReactJS, NextJS, Ionic & Capacitor for frontend and Node or PHP on the backend. He hosts a podcast called Mobile DevCast where he talk about mobile app development, web native, and specifically Ionic framework and Capacitor.'},
    {id: 'youtube-player-15', videoId: 'IykMiS2mnVk', title: 'How I Learned to Code & Build an App that Makes Growing Food Easy | Dale Spoonemore | Ioniconf 2021',
    description: 'Dale started gardening in 2015 to grow food and became obsessed. He wanted to build an app to make it easier for others to do the same, so he learned how to code and built From Seed to Spoon, an Ionic app that calculates planting dates based on your nearest weather station and guides you through growing 100+ fruits, herbs and vegetables.'},
    {id: 'youtube-player-16', videoId: '3S6r2_nxMho', title: 'How to build any UI with Ionic | Dayana Jabif | Ioniconf 2021',
    description: 'Dayana is a passionate developer and the co-founder of @ionicthemes and @ng_templates where she helps developers build better Ionic and Angular apps faster. Her North Star is creating a free, happy, and quiet life for her to live in. In her spare time she loves to get into nature, train and meditate.'},
    {id: 'youtube-player-17', videoId: 'NVJX3C_bttg', title: 'How and Why to Develop a Native "Enterprise class" Plugin | Laurent Witt | Ioniconf 2021',
    description: 'Laurent is the COO of JNESIS, an Ionic Trusted Partner '},
    {id: 'youtube-player-18', videoId: 'LREz3II0lTQ', title: 'Pivoting Your Business with Cross Platform Technologies | Jedi Weller | Ioniconf 2021',
    description: 'Jedidiah Weller (Jedi) is an accomplished entrepreneur who focuses on empowering the intersection between business and technology. He is currently CEO at OpenForge and the founder of Startup Wars, as well as the organizer of the Startup Junto, Ionic, and Angular Meetups in Philadelphia. He has been a speaker and mentor at Startup events across the world, including the Thailand Startup Summit, San Francisco’s Developer Week, Austin’s SXSW, The Web Summit, and more. On a day to day basis Jedi can be found playing strategy games, hiking mountains, and performing Jedi mind-tricks to masses.'},
    {id: 'youtube-player-19', videoId: '0E1l2UgXh5k', title: 'Capacitor + Nx = Cross Platform Plugin Development | Brandon Roberts | Ioniconf 2021',
    description: 'Brandon Roberts, developer advocate at Nrwl, talks about Nx—a smart, extensible build framework—and how it can be used with Capacitor plugins.    '},
    {id: 'youtube-player-20', videoId: '2AezKG8_0u4', title: 'Ionic in the Enterprise | Darryn Campbell | Ioniconf 2021',
    description: 'Darryn is a software development architect and full-stack developer based out of the UK working for the Mobile Computing Business at Zebra Technologies. Zebra builds rugged enterprise mobile computers for use in retail, transportation, warehouse and healthcare.'},
    {id: 'youtube-player-21', videoId: '60EVeLNAFUQ', title: 'Ionic, More Than Just a Framework | Sani Yusuf | Ioniconf 2021',
    description: 'Sani Yusuf is the co-organiser of the Ionic UK group. Sani has also written books on Ionic including the famous Ionic Framework By Example and has also recorded 3 courses about Ionic on Linkedin Learning. Sani has been part of the Ionic open source community from its very stages and had worked on famous Ionic apps like Sworkit, Funzing, Perkbox among others.'},
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (Capacitor.getPlatform() === 'web') {
      this.initializeYoutubePlayerPluginWeb();
    }
  }

  async initializeYoutubePlayerPluginWeb() {
    console.log('HomePage::initializeYoutubePlayerPluginWeb() | method called');

    let options: IPlayerOptions = {playerId: this.videos[0].id, playerSize: {width: 300, height: 200}, videoId: this.videos[0].videoId, fullscreen: true, debug: true};
    const result = await YoutubePlayer.initialize(options);
    console.log('playerReady', result);

    const promisesArray = [];
    this.videos.slice(1).forEach(video => {
      console.log('video', video);
      options = {...options, playerId: video.id, videoId: video.videoId};
      promisesArray.push(YoutubePlayer.initialize(options));
    });

    await Promise.all(promisesArray);
  }

}
