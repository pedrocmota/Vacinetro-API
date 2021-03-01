import 'express-rate-limit'

declare module 'express-rate-limit' {
  declare namespace rateLimit {
    interface Options {
      message?: Object;
    }
  }
  declare function rateLimit(options?: rateLimit.Options): rateLimit.RateLimit;
  export = rateLimit;
}