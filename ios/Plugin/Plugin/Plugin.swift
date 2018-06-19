import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitor.ionicframework.com/docs/plugins/ios
 */
@objc(YoutubePlayer)
public class YoutubePlayer: CAPPlugin {
    
    var vc: YPViewController!
    
    @objc func echo(_ call: CAPPluginCall) {
        print("[Youtube Player Plugin Native iOS]: echo");
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }
    
    @objc func initialize(_ call: CAPPluginCall) {
        print("[Youtube Player Plugin Native iOS]: initialize");

        /*
        let alert = UIAlertController(title: "[Youtube Player Plugin Native iOS]: initialize", message: "Message", preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))
        
        self.bridge.viewController.present(alert, animated: true, completion: nil)
         */
        
        let videoId = call.getString("videoId") ?? "";
        let width = call.getInt("width") ?? nil;
        let height = call.getInt("height") ?? nil;
        print("[Youtube Player Plugin Native iOS]: videoId " + videoId);
        print("[Youtube Player Plugin Native iOS]: width \(width)");
        print("[Youtube Player Plugin Native iOS]: height \(height)");
        
        if (videoId != "") {
            self.vc = YPViewController();
            
            let options = [
                "videoId" : videoId,
                "width" : width,
                "height": height,
                ] as [String : Any]
            
            self.vc.options = options
            self.bridge.viewController.present(self.vc!, animated: true, completion: {
                call.success([
                    "value": "[Youtube Player Plugin Native iOS]: initialize"
                    ])
            });
        }
        else {
            call.reject("Must provide a videoId")
            return
        }

        
    }
}
