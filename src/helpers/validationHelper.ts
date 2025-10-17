import { TValidation, ValidateInputOptions } from "../types/vaildationTypes";

/**
 * ValidationHelper
 * -------------------------
 * Provides shared functionality for all controllers, including input validation.
 */
export default class ValidationHelper {

  /**
   * valdiate
   * -------------------------
   * Validates incoming request data against defined rules.
   * Supports required fields, type checks, arrays, and custom synchronous/asynchronous validators.
   * Throws an error if validation fails.
   * 
   * @param options - Object containing request body and validation rules
   * @returns The validated data typed as T
   */
  static async validate<T>(options: ValidateInputOptions): Promise<T> {
    const { body, rules } = options;
    const errors: string[] = [];

    for (const { field, validation = TValidation.default, required = true, customValidate, customValidateAsync } of rules) {
      const value = body[field];

      // Check required fields (including empty arrays)
      if (required && (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0))) {
        errors.push(`${field} is required`);
        continue;
      }

      // Skip validation for optional empty fields
      if (!required && (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0))) {
        continue;
      }

      const addError = (msg: string) => errors.push(`${field} ${msg}`);

      // Predefined validations
      switch (validation) {
        case TValidation.name:
          if (typeof value === 'string' && /\d/.test(value))
            addError('should not contain numbers');
          break;

        case TValidation.email:
          if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            addError('must be a valid email address');
          break;

        case TValidation.date:
          if (typeof value === 'string' && isNaN(Date.parse(value)))
            addError('must be a valid date');
          break;

        case TValidation.arrayDefault:
          if (!Array.isArray(value) || value.some(v => v === undefined || v === null || v === ''))
            addError('must be a non-empty array with valid values');
          break;

        case TValidation.arrayString:
          if (!Array.isArray(value) || value.some(v => typeof v !== 'string' || v === ''))
            addError('must be an array of non-empty strings');
          break;

        case TValidation.arrayNumber:
          if (!Array.isArray(value) || value.some(v => typeof v !== 'number' || isNaN(v)))
            addError('must be an array of valid numbers');
          break;

        case TValidation.default:
        default:
          break;
      }

      // Run custom synchronous validator
      if (typeof customValidate === 'function') {
        const result = customValidate(value);
        if (!result) addError('failed custom validation');
      }

      // Run custom asynchronous validator
      if (typeof customValidateAsync === 'function') {
        const result = await customValidateAsync(value);
        if (!result) addError('failed async custom validation');
      }
    }

    // Throw error if any validation failed
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    // Return validated body
    return body as T;
  }
}
