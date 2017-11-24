declare function slugify(
  string: string,
  options?:
    | {
        replacement?: string;
        remove?: RegExp;
        lower?: boolean;
      }
    | string,
): string;

export default slugify;
