import dns from "dns/promises";

/**
 * EmailHelper
 * -------------------------
 * Provides methods for validating and sanitizing email addresses.
 */
export class EmailHelper {
  /** Simple regex for general email syntax */
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /** List of disposable or temporary email domains */
  private static readonly DISPOSABLE_DOMAINS = new Set([
    "mailinator.com",
    "10minutemail.com",
    "tempmail.com",
    "guerrillamail.com",
    "trashmail.com",
    "yopmail.com",
    "getnada.com",
    "maildrop.cc",
    "fakeinbox.com",
    "dispostable.com",
    "inboxkitten.com",
    "sharklasers.com",
    "grr.la",
    "spam4.me",
    "temp-mail.org",
    "moakt.com",
    "emailondeck.com",
    "mohmal.com",
    "tmail.com",
    "throwawaymail.com",
    "mytemp.email",
    "inboxbear.com",
    "temporary-mail.net",
    "luxusmail.org",
    "burnermail.io",
    "dropmail.me",
    "mailnesia.com",
    "mail-temp.com",
    "trashmail.me",
  ]);

  /**
   * Validates an email address for syntax, domain legitimacy, and MX records.
   * @param email Email address to validate
   * @returns Object containing validity and optional reason
   */
  static async validateEmail(
    email: string
  ): Promise<{ valid: boolean; reason?: string }> {
    if (!this.EMAIL_REGEX.test(email)) {
      return { valid: false, reason: "Invalid email format" };
    }

    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return { valid: false, reason: "Missing domain" };

    // Block disposable email domains
    if (this.DISPOSABLE_DOMAINS.has(domain)) {
      return { valid: false, reason: "Disposable email addresses not allowed" };
    }

    // Check MX records for domain
    try {
      const records = await dns.resolveMx(domain);
      if (!records || records.length === 0) {
        return { valid: false, reason: "No MX records found for domain" };
      }
    } catch {
      return { valid: false, reason: "Domain does not accept email" };
    }

    return { valid: true };
  }

  /**
   * Sanitizes an email string by replacing invalid characters.
   * @param email Raw email string
   * @returns Sanitized email safe for file names or database keys
   */
  static sanitizeEmail(email: string): string {
    return email.replace(/[^a-zA-Z0-9._-]/g, "_");
  }
}
