import Foundation
import Capacitor
import ViewController

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

        self.bridge.viewController.present(ViewController, animated: true, completion: nil);
    }
}
