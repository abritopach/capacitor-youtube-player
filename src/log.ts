import type { IPlayerLog } from './web/models/models';

export class Log implements IPlayerLog {

    logEnabled = false;

    constructor(logEnabled = false) {
        this.logEnabled = logEnabled;
    }

    public log(msg: string, ...suportingDetails: any[]): void {
        this.emitLogMessage("log", msg, suportingDetails);
    }

    public debug(msg: string, ...suportingDetails: any[]): void {
        this.emitLogMessage("debug", msg, suportingDetails);
    }

    public warn(msg: string, ...suportingDetails: any[]): void {
        this.emitLogMessage("warn", msg, suportingDetails);
    }

    public error(msg: string, ...suportingDetails: any[]): void {
        this.emitLogMessage("error", msg, suportingDetails);
    }

    public info(msg: string, ...suportingDetails: any[]): void {
        this.emitLogMessage("info", msg, suportingDetails);
    }

    private emitLogMessage(msgType: "log" | "debug" | "warn" | "error" | "info", msg: string, suportingDetails: any[]) {
        if (this.logEnabled) {
            suportingDetails.length > 0 ? console[msgType]("[Youtube Player Plugin Web]: " + msg, suportingDetails) 
            : console[msgType]("[Youtube Player Plugin Web]: " + msg);
        }
    }

}