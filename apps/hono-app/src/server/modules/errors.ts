import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";
import { isObject } from "~/modules/utils";
import type { Logger } from "./log";

interface HttpErrorParams {
  status?: ContentfulStatusCode;
  message?: string;
  res?: Response;
  code?: string;
  cause?: unknown;
  issues?: Issue[];
}

interface Issue {
  readonly message: string;
  readonly path?: unknown;
}

type HTTPErrorParamsWithoutStatus = Omit<HttpErrorParams, "status">;

class HttpError extends HTTPException {
  readonly res: Response;
  readonly code?: string;
  readonly issues?: Issue[];
  readonly cause?: unknown;

  constructor({
    status = 500,
    message = "Something went wrong",
    code,
    cause,
    res,
    issues,
  }: HttpErrorParams) {
    super(status, {
      message,
      cause,
    });
    this.res =
      res ??
      new Response(
        JSON.stringify({
          message,
          code,
          ...(issues ? { issues } : {}),
        }),
        {
          status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    this.code = code;
    this.issues = issues;
  }
}

export const errors = {
  NOT_FOUND: ({
    message = "Not Found",
    ...rest
  }: HTTPErrorParamsWithoutStatus = {}) =>
    new HttpError({
      status: 404,
      message,
      ...rest,
    }),
  UNAUTHORIZED: ({
    message = "Unauthorized",
    ...rest
  }: HTTPErrorParamsWithoutStatus = {}) =>
    new HttpError({
      status: 401,
      message,
      ...rest,
    }),
  FORBIDDEN: ({
    message = "Forbidden",
    ...rest
  }: HTTPErrorParamsWithoutStatus = {}) =>
    new HttpError({
      status: 403,
      message,
      ...rest,
    }),
  BAD_REQUEST: ({
    message = "Bad Request",
    ...rest
  }: HTTPErrorParamsWithoutStatus = {}) =>
    new HttpError({
      status: 400,
      message,
      ...rest,
    }),
  INTERNAL_SERVER_ERROR: ({
    message = "Internal Server Error",
    ...rest
  }: HTTPErrorParamsWithoutStatus = {}) =>
    new HttpError({
      status: 500,
      message,
      ...rest,
    }),
  GATEWAY_TIMEOUT: ({
    message = "Gateway Timeout",
    ...rest
  }: HTTPErrorParamsWithoutStatus = {}) =>
    new HttpError({
      status: 504,
      message,
      ...rest,
    }),
  BAD_GATEWAY: ({
    message = "Bad Gateway",
    ...rest
  }: HTTPErrorParamsWithoutStatus = {}) =>
    new HttpError({
      status: 502,
      message,
      ...rest,
    }),
  BY_STATUS: (status: number) => {
    switch (status) {
      case 400:
        return errors.BAD_REQUEST;
      case 401:
        return errors.UNAUTHORIZED;
      case 403:
        return errors.FORBIDDEN;
      case 404:
        return errors.NOT_FOUND;
      case 502:
        return errors.BAD_GATEWAY;
      case 504:
        return errors.GATEWAY_TIMEOUT;
      default:
        return errors.INTERNAL_SERVER_ERROR;
    }
  },
};

export function createErrorProcessor({
  logger,
  diagnoser,
  captureException,
}: {
  logger: Logger;
  diagnoser?: ErrorDiagnoser | undefined;
  captureException?: (error: unknown) => void;
}) {
  const diagnoseError = createErrorDiagnoser(diagnoser);

  return function processError(error: unknown, request: Request) {
    const { dumpable, loggable, cause, reportable, httpError } =
      diagnoseError(error);

    if (loggable) {
      logger.error(
        {
          message: httpError.message,
          status: httpError.status,
        },
        `[${request.method}] ${new URL(request.url).pathname} >> HTTP Error`
      );
    }

    if (dumpable) {
      logger.error(error);

      if (cause) {
        logger.error(cause, "Error caused by:");
      }
    }

    if (reportable) {
      if (!captureException) {
        logger.warn(
          "No captureException function provided, error will not be reported."
        );
      }

      captureException?.(error);
    }

    return httpError.res;
  };
}

export interface ErrorDiagnosis {
  httpError?: HttpError;
  loggable: boolean;
  dumpable: boolean;
  reportable: boolean;
  cause?: unknown;
}

export type ErrorDiagnoser = (error: unknown) => ErrorDiagnosis | undefined;

export function createErrorDiagnoser(
  diagnoser: ErrorDiagnoser | undefined = undefined
) {
  return function diagnoseError(error: unknown) {
    let loggable = false;
    let dumpable = false;
    let reportable = false;
    let httpError: HttpError | undefined;
    let status = 500;
    let message: string | undefined;

    // eslint-disable-next-line no-nested-ternary -- succinct
    const cause = isObject(error)
      ? "cause" in error
        ? error.cause
        : undefined
      : undefined;

    switch (true) {
      case error instanceof HttpError:
        loggable = true;
        dumpable = error.status >= 500;
        httpError = error;

        break;
      case error instanceof ZodError:
        httpError = errors.BAD_REQUEST({
          code: "VALIDATION_FAILED",
          message: "Validation failed",
          cause: error,
          issues: error.issues,
        });
        break;
      default:
        // biome-ignore lint/correctness/noSwitchDeclarations: conscious choice
        const userDiagnosis = diagnoser?.(error);
        if (userDiagnosis) {
          httpError = userDiagnosis.httpError;
          loggable = userDiagnosis.loggable;
          dumpable = userDiagnosis.dumpable;
          reportable = userDiagnosis.reportable;
        } else {
          loggable = true;
          dumpable = true;
          reportable = true;
        }

        // In case user diagnoser did not return an error or was not matched
        if (!httpError) {
          if (errorHasStatusCode(error)) {
            status = error.status;
          }
          if (errorHasMessage(error)) {
            message = error.message;
          }

          if (!message || message === "") {
            message = "Something went wrong, we are investigating";
          }

          httpError = errors.BY_STATUS(status)({
            message,
            cause,
          });
        }
    }

    return {
      httpError: httpError ?? errors.INTERNAL_SERVER_ERROR(),
      loggable,
      dumpable,
      reportable,
      cause,
    };
  };
}

function errorHasStatusCode(error: unknown): error is { status: number } {
  return isObject(error) && "status" in error && Number.isInteger(error.status);
}

function errorHasMessage(error: unknown): error is { message: string } {
  return (
    isObject(error) && "message" in error && typeof error.message === "string"
  );
}
