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
        call.resolve([
            "value": value
        ])
    }

    @objc func initialize(_ call: CAPPluginCall) {
        print("[Youtube Player Plugin Native iOS]: initialize");

        if (call.getString("videoId") != nil) {
            self.vc = YPViewController();

            let options = [
                "videoId" : call.getString("videoId") ?? nil,
                "fullscreen" : call.getBool("fullscreen") ?? false,
                "playerSize" : call.getObject("playerSize") ?? nil,
                "playerVars": call.getObject("playerVars") ?? nil
                ] as [String : Any]

            self.vc.options = options

            DispatchQueue.main.async {
                self.bridge?.viewController?.present(self.vc!, animated: true, completion: {
                    call.resolve([
                        "value": "[Youtube Player Plugin Native iOS]: initialize"
                        ])
                });
            }
        }
        else {
            call.reject("Must provide a videoId")
            return
        }

    }
}
