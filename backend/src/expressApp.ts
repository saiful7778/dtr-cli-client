import express from "express";
import type { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import getEnv from "./utils/env";
import requestIp from "request-ip";
import { rateLimit } from "express-rate-limit";
import type { HttpError } from "http-errors";
import createHttpError from "http-errors";
import morganMiddleware from "./logger/morgan.logger";
import authRoute from "./apis/auth/route";

export default function expressApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: getEnv("frontendUrl"),
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );

  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));

  app.use(requestIp.mw());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5000, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    keyGenerator: (req, _res) => {
      return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
    },
    handler: (_, __, next, options) => {
      return next(
        createHttpError(
          options.statusCode || 500,
          `There are too many requests. You are only allowed ${
            options.max
          } requests per ${options.windowMs / 60000} minutes`
        )
      );
    },
  });

  // Apply the rate limiting middleware to all requests
  app.use(limiter);

  app.use(morganMiddleware);

  app.get("/api", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running",
    });
  });

  app.use("/api/auth", authRoute);

  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  });

  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
      const errData = {
        status: err.status || err.statusCode || 500,
        name: err.name,
        message: err.message || "server error",
      };

      res.status(errData.status).json({
        success: false,
        message: errData.message,
      });
    }
  );

  return app;
}
