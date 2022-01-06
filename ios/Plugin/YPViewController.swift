//
//  YPViewController.swift
//  Plugin
//
//  Created by Adrián Brito on 18/6/18.
//  Copyright © 2018 Max Lynch. All rights reserved.
//

import UIKit
import YouTubePlayer
import SVProgressHUD

public class YPViewController: UIViewController, YouTubePlayerDelegate {
    var youtubePlayer: YouTubePlayerView!
    var options: [String : Any]!
    private var _defaultSizes: [String : Int] = [
        "height": 270,
        "width": 367
    ]
    public override func viewDidLoad() {
        super.viewDidLoad()
        print("[Youtube Player Plugin Native iOS]: YPViewController::viewDidLoad");
    }

    public override func viewWillAppear(_ animated: Bool) {
        print("[Youtube Player Plugin Native iOS]: YPViewController::viewWillAppear");
    }

    public override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated);
        print("[Youtube Player Plugin Native iOS]: YPViewController::viewDidAppear")
        // Do any additional setup after loading the view, typically from a nib.
        if JSONSerialization.isValidJSONObject(self.options!) {
            print("[Youtube Player Plugin Native iOS]: JSONSerialization.isValidJSONObject");
            if let dictionary = self.options {
                SVProgressHUD.show()
                // treat it as a string key dictionary.
                let videoId = dictionary["videoId"] as! String
                let fullscreen = dictionary["fullscreen"] as! Bool
                print("[Youtube Player Plugin Native iOS]: fullscreen", fullscreen)
                // let playerVars = dictionary["playerVars"] as! [String: Any]
                var playerSize = dictionary["playerSize"] as! [String: Int]
                playerSize = checkSize(size: playerSize)
                youtubePlayer = YouTubePlayerView(frame: CGRect(x: 0, y: 0, width: playerSize["width"]!, height: playerSize["height"]!))

                youtubePlayer.delegate = self

                self.view.addSubview(youtubePlayer)

                youtubePlayer.loadVideoID(videoId, fullscreen)
            }
        }
    }
    public override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    func checkSize(size: [String: Int]) -> [String : Int] {
        var playerSize = [
            "width" : size["width"] ?? self._defaultSizes["width"]!,
            "height": size["height"] ?? self._defaultSizes["height"]!
        ] as [String : Int]
        if (playerSize["height"]! > Int(UIScreen.main.bounds.height)) {
            playerSize["height"] = Int(UIScreen.main.bounds.height)
        }
        if (playerSize["width"]! > Int(UIScreen.main.bounds.width)) {
            playerSize["width"] = Int(UIScreen.main.bounds.width)
        }
        return playerSize;
    }

    public func playerReady(_ youtubePlayer: YouTubePlayerView){
        print("[Youtube Player Plugin Native iOS]: playerReady")
        SVProgressHUD.dismiss()
    }
}
