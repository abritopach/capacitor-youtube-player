export class Log {
    constructor(logEnabled = false) {
        this.logEnabled = false;
        this.logEnabled = logEnabled;
    }
    log(msg, ...suportingDetails) {
        this.emitLogMessage("log", msg, suportingDetails);
    }
    debug(msg, ...suportingDetails) {
        this.emitLogMessage("debug", msg, suportingDetails);
    }
    warn(msg, ...suportingDetails) {
        this.emitLogMessage("warn", msg, suportingDetails);
    }
    error(msg, ...suportingDetails) {
        this.emitLogMessage("error", msg, suportingDetails);
    }
    info(msg, ...suportingDetails) {
        this.emitLogMessage("info", msg, suportingDetails);
    }
    emitLogMessage(msgType, msg, suportingDetails) {
        if (this.logEnabled) {
            suportingDetails.length > 0 ? console[msgType]("[Youtube Player Plugin Web]: " + msg, suportingDetails)
                : console[msgType]("[Youtube Player Plugin Web]: " + msg);
        }
    }
}
//# sourceMappingURL=log.js.map