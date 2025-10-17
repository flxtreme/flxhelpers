import * as lodash from "lodash";

type TCustomUtils = {
  slugify: (str: string) => string;
  isValidSlug: (str: string) => boolean;
  capitalizeWords: (str: string) => string;
  isBlank: (str?: string | null) => boolean;
  sleep: (ms: number) => void;
}

const baseUtils: typeof lodash & TCustomUtils = {
  ...lodash,
  /** Converts spaces and special characters into a URL-safe slug */
  slugify(str: string): string {
    return lodash.kebabCase(str);
  },
  /** Validates if a string is a properly formatted slug */
  isValidSlug(str: string): boolean {
    // A valid slug contains lowercase letters, numbers, and single hyphens (no consecutive or trailing)
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str);
  },

  /** Capitalizes the first letter of every word */
  capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  },

  /** Checks if a string is empty, null, or contains only whitespace */
  isBlank(str?: string | null): boolean {
    return !str || str.trim().length === 0;
  },

  /** Delays execution for a specified duration (in milliseconds) */
  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

export default baseUtils;