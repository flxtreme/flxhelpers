import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

/**
 * EncryptionHelper
 * -------------------------
 * Provides utility methods for password hashing, verification, and ID generation.
 */
export class EncryptionHelper {
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

  /**
   * Generates a unique identifier using UUID v4.
   * @returns UUID string
   */
  static generateId(): string {
    return uuidv4();
  }
}
