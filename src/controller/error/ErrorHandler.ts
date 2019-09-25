import { Request, Response, NextFunction } from 'express';
import * as createError from "http-errors";
import * as i18n from "i18n";

import { IKafkaProducerService } from '../../abstract/service/kafka/IKafkaProducerService';

/**
 400	BadRequest
 401	Unauthorized
 402	PaymentRequired
 403	Forbidden
 404	NotFound
 405	MethodNotAllowed
 406	NotAcceptable
 407	ProxyAuthenticationRequired
 408	RequestTimeout
 409	Conflict
 410	Gone
 411	LengthRequired
 412	PreconditionFailed
 413	PayloadTooLarge
 414	URITooLong
 415	UnsupportedMediaType
 416	RangeNotSatisfiable
 417	ExpectationFailed
 418	ImATeapot
 421	MisdirectedRequest
 422	UnprocessableEntity
 423	Locked
 424	FailedDependency
 425	UnorderedCollection
 426	UpgradeRequired
 428	PreconditionRequired
 429	TooManyRequests
 431	RequestHeaderFieldsTooLarge
 451	UnavailableForLegalReasons
 500	InternalServerError
 501	NotImplemented
 502	BadGateway
 503	ServiceUnavailable
 504	GatewayTimeout
 505	HTTPVersionNotSupported
 506	VariantAlsoNegotiates
 507	InsufficientStorage
 508	LoopDetected
 509	BandwidthLimitExceeded
 510	NotExtended
 511	NetworkAuthenticationRequired
 */

export class ErrorHandler {

    private _kafkaProducerService: IKafkaProducerService;

    constructor(kafkaProducerService) {

        this._kafkaProducerService = kafkaProducerService;
    }

    createNotFoundError = (req: Request, res: Response, next: NextFunction) => {
        next(createError(404));
    }

    createServiceUnavailableError = (req: Request, res: Response, next: NextFunction) => {
        next(createError(503));
    }

    errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        switch (err.status) {
            case 400:
                this.badRequestHandler(err, req, res, next);
                break;
            case 401:
                this.unauthorizedHandler(err, req, res, next);
                break;
            case 403:
                this.forbiddenHandler(err, req, res, next);
                break;
            case 404:
                this.notFoundHandler(err, req, res, next);
                break;
            case 500:
                this.internalServerErrorHandler(err, req, res, next);
                break;
            case 501:
                this.notImplementedHandler(err, req, res, next);
                break;
            default:
                this.internalServerErrorHandler(err, req, res, next);
                break;
        }
    }

    badRequestHandler = (err, req, res, next) => {
        console.log(err.stack);
        const errorCode = err && err.error && err.error.errorCode ? err.error.errorCode : "";
        const formattedStack = err && typeof err.stack === "string" ? err.stack.replace(/ at /g, " <br/>at ") : ""; 

        this._kafkaProducerService.pushSystemErrorMsg({ channels: ["email"], dataObjs: [{ message: formattedStack }] });
        res.status(400)
            .json({
                errorCode: errorCode,
                message: errorCode ? i18n.__(`errorMessages.${errorCode}`) : i18n.__(`errorMessages.badRequest`),
            });
    }

    unauthorizedHandler = (err, req, res, next) => {
        console.log(err.stack);
        const errorCode = err && err.error && err.error.errorCode ? err.error.errorCode : "";
        const formattedStack = err && typeof err.stack === "string" ? err.stack.replace(/ at /g, " <br/>at ") : ""; 

        // this._kafkaProducerService.pushSystemErrorMsg({ channels: ["email"], dataObjs: [{ message: formattedStack }] });
        res.status(401)
            .json({
                errorCode: errorCode,
                message: errorCode ? i18n.__(`errorMessages.${errorCode}`) : i18n.__(`errorMessages.unauthorized`),
            });
    }

    forbiddenHandler = (err, req, res, next) => {
        console.log(err.stack);
        const errorCode = err && err.error && err.error.errorCode ? err.error.errorCode : "";
        const formattedStack = err && typeof err.stack === "string" ? err.stack.replace(/ at /g, " <br/>at ") : ""; 

        this._kafkaProducerService.pushSystemErrorMsg({ channels: ["email"], dataObjs: [{ message: formattedStack }] });
        res.status(403)
            .json({
                errorCode: errorCode,
                message: errorCode ? i18n.__(`errorMessages.${errorCode}`) : i18n.__(`errorMessages.forbidden`),
            });
    }

    notFoundHandler = (err, req, res, next) => {
        console.log(err.stack);
        const errorCode = err && err.error && err.error.errorCode ? err.error.errorCode : "";
        const formattedStack = err && typeof err.stack === "string" ? err.stack.replace(/ at /g, " <br/>at ") : "";

        // this._kafkaProducerService.pushSystemErrorMsg({ channels: ["email"], dataObjs: [{ message: formattedStack }] });
        res.status(404)
            .json({
                errorCode: errorCode,
                message: errorCode ? i18n.__(`errorMessages.${errorCode}`) : i18n.__(`errorMessages.notFound`),
            });
    }

    internalServerErrorHandler = (err, req, res, next) => {
        console.log(err.stack);
        const errorCode = err && err.error && err.error.errorCode ? err.error.errorCode : "";
        const formattedStack = err && typeof err.stack === "string" ? err.stack.replace(/ at /g, " <br/>at ") : ""; 

        this._kafkaProducerService.pushSystemErrorMsg({ channels: ["email"], dataObjs: [{ message: formattedStack }] });
        res.status(500)
            .json({
                errorCode: errorCode,
                message: errorCode ? i18n.__(`errorMessages.${errorCode}`) : i18n.__(`errorMessages.internalServerError`),
            });
    }

    notImplementedHandler = (err, req, res, next) => {
        console.log(err.stack);
        const errorCode = err && err.error && err.error.errorCode ? err.error.errorCode : "";
        const formattedStack = err && typeof err.stack === "string" ? err.stack.replace(/ at /g, " <br/>at ") : ""; 

        this._kafkaProducerService.pushSystemErrorMsg({ channels: ["email"], dataObjs: [{ message: formattedStack }] });
        res.status(501)
            .json({
                errorCode: errorCode,
                message: errorCode ? i18n.__(`errorMessages.${errorCode}`) : i18n.__(`errorMessages.notImplemented`),
            });
    }

    serviceUnavailableHandler = (err, req, res, next) => {
        console.log(err.stack);
        const errorCode = err && err.error && err.error.errorCode ? err.error.errorCode : "";
        const formattedStack = err && typeof err.stack === "string" ? err.stack.replace(/ at /g, " <br/>at ") : ""; 

        this._kafkaProducerService.pushSystemErrorMsg({ channels: ["email"], dataObjs: [{ message: formattedStack }] });
        res.status(503)
            .json({
                errorCode: errorCode,
                message: errorCode ? i18n.__(`errorMessages.${errorCode}`) : i18n.__(`errorMessages.serviceUnavailable`),
            });
    }
}
