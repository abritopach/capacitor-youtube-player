//
//  YPViewController.swift
//  Plugin
//
//  Created by Adrián Brito on 18/6/18.
//  Copyright © 2018 Max Lynch. All rights reserved.
//

import UIKit
import YouTubePlayer

public class YPViewController: UIViewController {
    
    
    var youtubePlayer: YouTubePlayerView!
    public override func viewDidLoad() {
        super.viewDidLoad()
        
        print("[Youtube Player Plugin Native iOS]: YPViewController::viewDidLoad");
        
    }
    
    public override func viewWillAppear(_ animated: Bool) {

        print("[Youtube Player Plugin Native iOS]: YPViewController::viewWillAppear");
        
    }
    
    public override func viewDidAppear(_ animated: Bool) {
        
        super.viewDidAppear(animated);
        
        print("[Youtube Player Plugin Native iOS]: YPViewController::viewDidAppear");
        // Do any additional setup after loading the view, typically from a nib.
        let videoId = "WAAZJm6H9Ms";
        
        youtubePlayer = YouTubePlayerView(frame: CGRect(x: 0, y: 0, width: 200, height: 200))
        self.view.addSubview(youtubePlayer)
        
        youtubePlayer.loadVideoID(videoId);
    }
    
    public override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
