declare const slugify: {
  (
    string: string,
    options?:
      | {
          replacement?: string;
          remove?: RegExp;
          lower?: boolean;
          strict?: boolean;
          locale?: string;
          trim?: boolean;
        }
      | string,

  ): string;
  extend: (args: Record<string, any>) => void;
};

export default slugify;
