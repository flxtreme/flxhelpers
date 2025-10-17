import bcrypt from "bcrypt";

/**
 * EncryptionHelper
 * -------------------------
 * Provides utility methods for password hashing, verification, and ID generation.
 */
export default class EncryptionHelper {
  private static defaultSaltRounds = 10;

  /**
   * Hashes a plain text password using bcrypt.
   * @param password - Plain text password
   * @param saltRounds - Optional bcrypt salt rounds (default: 10)
   * @returns Hashed password string
   */
  static async hashPassword(password: string, saltRounds?: number): Promise<string> {
    return await bcrypt.hash(password, saltRounds ?? this.defaultSaltRounds);
  }

  /**
   * Compares a plain text password with a stored hash.
   * @param password - Plain text password
   * @param hash - Stored bcrypt hash
   * @returns true if passwords match
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
