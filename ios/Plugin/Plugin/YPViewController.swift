//
//  YPViewController.swift
//  Plugin
//
//  Created by Adrián Brito on 18/6/18.
//  Copyright © 2018 Max Lynch. All rights reserved.
//

import UIKit
import YouTubePlayer

public class YPViewController: UIViewController, YouTubePlayerDelegate {
    
    
    var youtubePlayer: YouTubePlayerView!
    var options: [String : Any]!
    private var _defaultSizes: [String : Int] = [
        "height": 270,
        "width": 367
    ];
    
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
        
        if JSONSerialization.isValidJSONObject(self.options) {
            print("[Youtube Player Plugin Native iOS]: JSONSerialization.isValidJSONObject");
            
            if let dictionary = self.options as? [String: Any] {
                // treat it as a string key dictionary.
                let videoId = dictionary["videoId"] as! String
                let width = dictionary["width"] as! Int
                let height = dictionary["height"] as! Int
                let playerVars = dictionary["playerVars"] as! [String: Any]
                
                let playerSize: [String : Int] = checkSize(width: width, height: height)
                
                youtubePlayer = YouTubePlayerView(frame: CGRect(x: 0, y: 0, width: playerSize["width"]!, height: playerSize["height"]!))

                youtubePlayer.delegate = self

                self.view.addSubview(youtubePlayer)

                // let playerVars = ["controls": "1", "color": "red", "showinfo": "1", "autoplay": "0", "fs": "0", "loop": "0", "start": "60"]
                youtubePlayer.playerVars = playerVars as YouTubePlayerView.YouTubePlayerParameters
                
                youtubePlayer.loadVideoID(videoId);
                
            }
        }
    }
    
    public override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func checkSize(width: Int, height: Int) -> [String : Int] {
        
        var playerSize = [
            "width" : width ?? self._defaultSizes["width"]!,
            "height": height ?? self._defaultSizes["height"]!
        ] as [String : Int]
        
        if (playerSize["height"] as! Int > Int(UIScreen.main.bounds.height)) {
            playerSize["height"] = Int(UIScreen.main.bounds.height);
        }
        if (playerSize["width"] as! Int > Int(UIScreen.main.bounds.width)) {
            playerSize["width"] = Int(UIScreen.main.bounds.width);
        }
        return playerSize;
    }

    public func playerReady(_ youtubePlayer: YouTubePlayerView){
        print("[Youtube Player Plugin Native iOS]: playerReady")
        // SVProgressHUD.dismiss()
        
    }
}
