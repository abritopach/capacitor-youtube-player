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
    var options: [String : Any]!
    
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
                print("videoId: \(videoId)")
                let width = dictionary["width"] as! Int
                let height = dictionary["height"] as! Int
                
                youtubePlayer = YouTubePlayerView(frame: CGRect(x: 0, y: 0, width: width, height: height))
                self.view.addSubview(youtubePlayer)
                
                youtubePlayer.loadVideoID(videoId);
            }
        }
    }
    
    public override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    /*
    func checkSize(options: [String : Any]!) {
        
        let playerSize = [
            "width" : options["width"] as! Int || self.defaultSizes["width"],
            "height": options["height"] as! Int || self.defaultSizes["height"]
            ] as [String : Any]
        
        if (playerSize["height"] > UIScreen.main.bounds.height) {
            playerSize["height"] = UIScreen.main.bounds.height;
        }
        if (playerSize["width"] > UIScreen.main.bounds.width) {
            playerSize["width"] = UIScreen.main.bounds.width;
        }
        return playerSize;
    }
 */
}
