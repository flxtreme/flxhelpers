import lodash from "lodash";
import * as datefns from "date-fns";

/**
 * flxUtils
 * -------------------------
 * Core utility hub combining Lodash, Date-FNS, and custom helpers.
 * Provides a unified utility interface for core, date, and custom operations.
 */
export const flxUtils = {
  /**
   * Core utilities (full Lodash access)
   * -----------------------------------
   * Access all Lodash methods via `flxUtils.core.<method>`.
   * Example: `flxUtils.core.cloneDeep(obj)`
   */
  core: lodash,

  /**
   * Date utilities (powered by date-fns)
   * ------------------------------------
   * Access all date-fns methods via `flxUtils.date.<method>`.
   * Example: `flxUtils.date.format(new Date(), "yyyy-MM-dd")`
   */
  date: datefns,

  /**
   * Custom helper utilities
   * ------------------------------------
   * Extended string and async utilities not included in Lodash or date-fns.
   */
  custom: {
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
  },
};
