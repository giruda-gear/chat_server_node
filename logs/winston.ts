import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logdir = "logs";

const logFormat = format.printf((info: any) => {
    return `${info.timestamp} ${info.level} : ${info.message}`;
});

const SocketLogger = createLogger({
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        logFormat
    ),
    transports: [
        new DailyRotateFile({
            filename: "socket-info.log",
            datePattern: "YYYY-MM-DD",
            dirname: logdir + "/socket",
            level: "info",
        }),
        new DailyRotateFile({
            filename: "socket-error.log",
            datePattern: "YYYY-MM-DD",
            dirname: logdir + "/socket",
            level: "error",
        }),
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        }),
    ],
});

export { SocketLogger };
