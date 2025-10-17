/**
 * flxhelpers (Client Build)
 * -------------------------
 * Lightweight, browser-safe export hub.
 * 
 * ✅ Safe for: React, Next.js, or other frontend environments.
 * 🚫 Excludes: Node-specific helpers (EmailHelper, EncryptionHelper, ValidationHelper)
 */

import dateUtils from "./utils/dateUtils";
import baseUtils from "./utils/baseUtils";

/**
 * Browser-safe exports
 * -------------------------
 * - `dateUtils`: Date utilities powered by date-fns
 * - `baseUtils`: Extended Lodash utilities with custom helpers
 */
export { dateUtils, baseUtils };