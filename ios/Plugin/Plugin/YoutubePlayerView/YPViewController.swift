//
//  ViewController.swift
//  youtube-player-ios-example
//
//  Created by Adrián Brito on 7/6/18.
//  Copyright © 2018 Adrián Brito. All rights reserved.
//

import UIKit
import YouTubePlayer

public class YPViewController: UIViewController {

    @IBOutlet weak var youtubePlayer: YouTubePlayerView!
    public override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view, typically from a nib.
        let videoId = "WAAZJm6H9Ms";
        
        youtubePlayer.loadVideoID(videoId);
        
        // youtubePlayer.load(withVideoId: videoId);
    }

    public override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

