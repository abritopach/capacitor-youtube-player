import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitor.ionicframework.com/docs/plugins/ios
 */
@objc(YoutubePlayer)
public class YoutubePlayer: CAPPlugin {
    
    @objc func echo(_ call: CAPPluginCall) {
        print("[Youtube Player Plugin Native iOS]: echo");
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }
    
    @objc func initialize(_ call: CAPPluginCall) {
        print("[Youtube Player Plugin Native iOS]: initialize");

        let alert = UIAlertController(title: "[Youtube Player Plugin Native iOS]: initialize", message: "Message", preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: nil))

        self.bridge.viewController.present(alert, animated: true, completion: nil);

        call.success([
            "value": "[Youtube Player Plugin Native iOS]: initialize"
        ])
    }
}
