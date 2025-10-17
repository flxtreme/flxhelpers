/**
 * flxhelpers Entry Point
 * -------------------------
 * Unified export hub for all core helpers and utilities.
 * 
 * ✅ Safe for: Node.js (API, scripts, backends)
 * ⚠️ Partially safe for: Browser (React, Next.js)
 * 
 * For browser-only usage, only import:
 *   → { baseUtils, dateUtils }
 * 
 * Node-only modules (use in backend only):
 *   → EmailHelper, EncryptionHelper, ValidationHelper
 */

import dateUtils from "./utils/dateUtils";
import baseUtils from "./utils/baseUtils";

// Node-only helpers
import EmailHelper from "./helpers/emailHelper";
import EncryptionHelper from "./helpers/encryptionHelper";
import ValidationHelper from "./helpers/validationHelper";

/**
 * Exported namespaces
 * -------------------------
 * - `dateUtils`: Lightweight date utilities powered by date-fns
 * - `baseUtils`: Extended Lodash utilities with custom helpers
 * - `EmailHelper`: Email validation & sanitization (Node-only)
 * - `EncryptionHelper`: Password hashing & UUID generation (Node-only)
 * - `ValidationHelper`: Input validation for request bodies (Node-only)
 */
export { dateUtils, baseUtils, EmailHelper, EncryptionHelper, ValidationHelper };