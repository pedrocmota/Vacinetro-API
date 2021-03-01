declare module 'http' {
  export interface IncomingHttpHeaders {
    token: string
  }
}