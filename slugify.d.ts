declare module slugify {
  type ExtendArgs = {
    [key: string]: any;
  };

  export function extend(args: ExtendArgs): void;
}

/**
 * @param string
 * @param replacement replace spaces with replacement character, defaults to `-`
 */
declare function slugify(string: string, replacement?: string): string;
declare function slugify(
  string: string,
  options?: {
    /**
     * replace spaces with replacement character
     * @default '-'
     */
    replacement?: string;
    /**
     * remove characters that match regex
     */
    remove?: RegExp;
    /**
     * convert to lower case
     * @default false
     */
    lower?: boolean;
    /**
     * strip special characters except replacement
     * @default false
     */
    strict?: boolean;
    /**
     * language code of the locale to use
     */
    locale?: string;
  }
): string;

export default slugify;
