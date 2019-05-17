import { Request, Response, NextFunction } from 'express';
import * as createError from "http-errors";

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
export function createNotFoundError(req: Request, res: Response, next: NextFunction) {
    next(createError(404, "Not Found"));
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    switch (err.status) {
        case 400:
            badRequestHandler(err, req, res, next);
            break;
        case 401:
            unauthorizedHandler(err, req, res, next);
            break;
        case 403:
            forbiddenHandler(err, req, res, next);
            break;
        case 404:
            notFoundHandler(err, req, res, next);
            break;
        case 500:
            internalServerErrorHandler(err, req, res, next);
            break;
        case 501:
            notImplementedHandler(err, req, res, next);
            break;
        default:
            internalServerErrorHandler(err, req, res, next);
            break;
    }
}

function badRequestHandler(err, req, res, next) {
    console.log(err.stack);
    res.status(400)
        .json({
            message: err && err.error ? err.error.message: "",
            errorCode: err && err.error ? err.error.errorCode: "",
        });
}

function unauthorizedHandler(err, req, res, next) {
    console.log(err.stack);
    res.status(401)
        .json({
            message: err && err.error ? err.error.message: "",
            errorCode: err && err.error ? err.error.errorCode: "",
        });
}

function forbiddenHandler(err, req, res, next) {
    console.log(err.stack);
    res.status(403)
        .json({
            message: err && err.error ? err.error.message: "",
            errorCode: err && err.error ? err.error.errorCode: "",
        });
}

function notFoundHandler(err, req, res, next) {
    console.log(err.stack);
    res.status(404)
        .json({
            message: err && err.error ? err.error.message: "",
            errorCode: err && err.error ? err.error.errorCode: "",
        });
}

function internalServerErrorHandler(err, req, res, next) {
    console.log(err.stack);
    res.status(500)
        .json({
            message: err && err.error ? err.error.message: "",
            errorCode: err && err.error ? err.error.errorCode: "",
        });
}

function notImplementedHandler(err, req, res, next) {
    console.log(err.stack);
    res.status(501)
        .json({
            message: err && err.error ? err.error.message: "",
            errorCode: err && err.error ? err.error.errorCode: "",
        });
}
