declare module slugify {
  type ExtendArgs = {
    [key: string]: any;
  }

  export function extend (args: ExtendArgs): void;
}

declare function slugify(
  string: string,
  options?:
    | {
        replacement?: string;
        remove?: RegExp;
        lower?: boolean;
        strict?: boolean;
        locale?: 'vi';
      }
    | string,

): string;

export default slugify;
