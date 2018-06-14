
  Pod::Spec.new do |s|
    s.name = 'CapacitorYoutubePlayer'
    s.version = '0.0.1'
    s.summary = 'Youtube Player'
    s.license = 'MIT'
    s.homepage = 'https://github.com/abritopach/capacitor-youtube-player'
    s.author = 'Adrián Brito Pacheco & José Antonio Pérez Florencia'
    s.source = { :git => 'https://github.com/abritopach/capacitor-youtube-player', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '10.0'
    s.dependency 'Capacitor'
    s.dependency 'YouTubePlayer'
  end