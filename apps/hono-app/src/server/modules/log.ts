import {
  pino,
  multistream,
  type Logger as PinoLogger,
  type LoggerOptions,
  type DestinationStream,
  levels,
} from "pino";
import pinoPretty from "pino-pretty";
import { config } from "~/config/server";

export interface Logger {
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
}

export interface RichLogger extends Logger {
  mock: (
    functions: Partial<Logger> & { log?: (...args: unknown[]) => void }
  ) => void;
  restore: () => void;
  pause: () => void;
  unpause: () => void;
}

export const DEFAULT_REDACTED_KEYS = [
  "password",
  "email",
  "name",
  "first_name",
  "last_name",
];

const DEFAULT_REDACTION_DEPTH = 3;

export const logger = createLogger({
  pretty: config.DEV,
});

interface CreateLoggerOptions<
  CustomLevels extends string = never,
  UseOnlyCustomLevels extends boolean = boolean
> extends Omit<
    LoggerOptions<CustomLevels, UseOnlyCustomLevels>,
    "customLevels"
  > {
  stream?: DestinationStream;
  redactionDepth?: number;
  redactedKeys?: string[];
  pretty?: boolean;
}

export function createLogger<
  CustomLevels extends string = never,
  UseOnlyCustomLevels extends boolean = boolean
>({
  stream,
  redactionDepth = DEFAULT_REDACTION_DEPTH,
  redactedKeys = DEFAULT_REDACTED_KEYS,
  pretty = false,
  hooks,
  ...options
}: CreateLoggerOptions<CustomLevels, UseOnlyCustomLevels> = {}): PinoLogger<
  CustomLevels,
  UseOnlyCustomLevels
> &
  RichLogger {
  let isPaused = false;
  let isMocked = false;
  let mocks: Partial<Logger> & { log?: (...args: unknown[]) => void } = {};

  let finalStream = stream;

  if (pretty) {
    finalStream = pinoPretty({
      colorize: true,
      sync: true,
    });
  }

  if (stream && pretty) {
    finalStream = multistream([
      { stream },
      {
        stream: pinoPretty({
          colorize: true,
          sync: true,
        }),
      },
    ]);
  }

  const pinoLogger = pino(
    {
      redact:
        redactedKeys.length > 0
          ? {
              censor: "[redacted]",
              // Path wildcards are created instead of using a single big glob * for performance reasons, if someone passes a big object
              // logger will try to match the path for arbitrary depth, which can be really slow, for small objects, 6 level deep the
              // performance hit is already 50% vs JSON.stringify. So we create manual keys for each depth level.
              paths: redactedKeys.reduce<string[]>(
                (keys, key) => [
                  ...keys,
                  ...createDeepRedactorKey(key, redactionDepth),
                ],
                []
              ),
            }
          : undefined,
      hooks: {
        logMethod(inputArgs, method, level) {
          if (isPaused) {
            return;
          }

          if (isMocked) {
            const logFn =
              mocks[levels.labels[level] as keyof Logger] ?? mocks.log;
            logFn ? logFn(...inputArgs) : method.apply(this, inputArgs);
            return;
          }

          method.apply(this, inputArgs);
        },
        ...hooks,
      },
      ...options,
    },
    finalStream
  );

  const mock: RichLogger["mock"] = (functions) => {
    isMocked = true;
    mocks = functions;
  };
  const restore: RichLogger["restore"] = () => {
    isMocked = false;
    mocks = {};
  };
  const pause: RichLogger["pause"] = () => {
    isPaused = true;
  };
  const unpause: RichLogger["unpause"] = () => {
    isPaused = false;
  };

  Object.defineProperty(pinoLogger, "mock", {
    value: mock,
    writable: true,
    enumerable: true,
  });

  Object.defineProperty(pinoLogger, "restore", {
    value: restore,
    writable: true,
    enumerable: true,
  });

  Object.defineProperty(pinoLogger, "pause", {
    value: pause,
    writable: true,
    enumerable: true,
  });

  Object.defineProperty(pinoLogger, "unpause", {
    value: unpause,
    writable: true,
    enumerable: true,
  });

  return pinoLogger as typeof pinoLogger & {
    mock: typeof mock;
    restore: typeof restore;
    pause: typeof pause;
    unpause: typeof unpause;
  };
}

export function createUnredactedLogger<
  CustomLevels extends string = never,
  UseOnlyCustomLevels extends boolean = boolean
>(
  options: Omit<
    CreateLoggerOptions<CustomLevels, UseOnlyCustomLevels>,
    "redactionDepth" | "redactedKeys"
  >
) {
  return createLogger<CustomLevels, UseOnlyCustomLevels>({
    redactedKeys: [],
    ...options,
  });
}

export function createDeepRedactorKey(redactedKey: string, depth: number) {
  let currentKey = redactedKey;
  const redactionKeys: string[] = [];

  for (let i = 0; i < depth; i++) {
    redactionKeys.push(currentKey);
    currentKey = `*.${currentKey}`;
  }

  return redactionKeys;
}
