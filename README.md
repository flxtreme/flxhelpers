# flxhelpers 🧠
> A modular utility toolkit combining Lodash, date-fns, and custom helper functions — built for modern Node.js + TypeScript projects.

---

## 🚀 Installation

```bash
# Using npm
npm install flxhelpers

# Or yarn
yarn add flxhelpers
```

## 📦 Importing

You can import everything from the root index:

```typescript
import { flxUtils, EmailHelper, EncryptionHelper, ValidationHelper } from "flxhelpers";
```

Or import them individually:

```typescript
import { flxUtils } from "flxhelpers/utils/flxUtils";
import { EmailHelper } from "flxhelpers/helpers/emailHelper";
import { EncryptionHelper } from "flxhelpers/helpers/encryptionHelper";
import { ValidationHelper } from "flxhelpers/helpers/validationHelper";
```

## 🧩 Project Structure

```bash
flxhelpers/
│
├── types/
│   └── validationTypes.ts
│
├── helpers/
│   ├── emailHelper.ts
│   ├── encryptionHelper.ts
│   └── validationHelper.ts
│
└── utils/
    └── flxUtils.ts
```

## 🧠 Usage Examples

### 🔹 Core (Lodash)

```typescript
import { flxUtils } from "flxhelpers";

const title = flxUtils.core.capitalize("hello world");
console.log(title); // "Hello world"
```

### 🔹 Date Utilities (date-fns)

```typescript
import { flxUtils } from "flxhelpers";

const today = flxUtils.date.format(new Date(), "yyyy-MM-dd");
console.log(today); // "2025-10-17"
```

### 🔹 Custom Helpers

```typescript
import { flxUtils } from "flxhelpers";

// Slugify a string
flxUtils.custom.slugify("Hello World!");
// → "hello-world"

// Validate slug
flxUtils.custom.isValidSlug("hello-world");
// → true

// Capitalize words
flxUtils.custom.capitalizeWords("the quick brown fox");
// → "The Quick Brown Fox"

// Check blank
flxUtils.custom.isBlank("   ");
// → true

// Sleep helper
await flxUtils.custom.sleep(1000);
// → waits for 1 second
```

## Custom Helpers

### 📧 EmailHelper

Validates and sanitizes email addresses with DNS MX lookup and disposable domain detection.

```typescript
import { EmailHelper } from "flxhelpers";

const result = await EmailHelper.validateEmail("test@mailinator.com");
console.log(result);
// → { valid: false, reason: "Disposable email addresses not allowed" }

console.log(EmailHelper.sanitizeEmail("john+test@gmail.com"));
// → "john_test_gmail.com"
```

### 🔐 EncryptionHelper

Provides password hashing, verification, and UUID generation utilities.

```typescript
import { EncryptionHelper } from "flxhelpers";

const hash = await EncryptionHelper.hashPassword("secret123");
const match = await EncryptionHelper.verifyPassword("secret123", hash);
console.log({ hash, match }); // → { hash: "...", match: true }

console.log(EncryptionHelper.generateId()); 
// → "de305d54-75b4-431b-adb2-eb6b9e546014"
```

### ✅ ValidationHelper

Validates incoming request data with flexible rule sets, types, and custom validators.

```typescript
import { ValidationHelper } from "flxhelpers";
import { TValidation } from "flxhelpers/types/validationTypes";

const body = {
  email: "user@example.com",
  roles: ["admin"],
};

await ValidationHelper.validate({
  body,
  rules: [
    { field: "email", validation: TValidation.email },
    { field: "roles", validation: TValidation.arrayString },
  ],
});
// → Returns validated body or throws error
```


