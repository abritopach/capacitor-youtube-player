//
//  ViewController.swift
//  youtube-player-ios-example
//
//  Created by Adrián Brito on 7/6/18.
//  Copyright © 2018 Adrián Brito. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    
    @IBOutlet weak var youtubePlayer: YTPlayerView!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        let videoId = "WAAZJm6H9Ms";
        // youtubePlayer.load(videoId);
        youtubePlayer.load(withVideoId: videoId);
        // youtubePlayer.cueVideo(videoId);
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

