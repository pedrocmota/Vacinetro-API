declare module 'sqlite-sync' {
  declare function connect(file: path): any;
  declare function run(run: string): array;
  declare function close(): void;
}
