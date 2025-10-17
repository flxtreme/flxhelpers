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
// server
import {
  fetcher, 
  baseUtils, 
  dateUtils,
  EmailHelper, 
  EncryptionHelper,
  ValidationHelper 
} from "flxhelpers";

// client
import {
  fetcher, 
  baseUtils, 
  dateUtils
} from "flxhelpers/client";
```

## 🧠 Usage Examples

### 🔹 Base Utils (lodash + Custom Utils)

```typescript
import { baseUtils } from "flxhelpers";

const { capitalize } = baseUtils;

const title = capitalize("hello world");
console.log(title); // "Hello world"
```

### 🔹 Date Utilities (date-fns + Custom Utils)

```typescript
import { dateUtils } from "flxhelpers";

const { format } = dateUtils;

const today = format(new Date(), "yyyy-MM-dd");
console.log(today); // "2025-10-17"
```

### 🔹 Custom Functions

```typescript
import { baseUtils } from "flxhelpers";

const { slugify, isValidSlug, capitalizeWords, isBlank, sleep } = baseUtils;

// Slugify a string
slugify("Hello World!");
// → "hello-world"
```

### 🔹 fetcher (client & server)

```typescript
// client
import { fetcher } from "flxhelpers/client";
// server
import { fetcher } from "flxhelpers";

// same usage
const response = await fetcher<{ id: number; title: string }[]>("/api/posts", {
  method: "GET",
  token: accessToken,
});
```

## Custom Helpers (Server-Side only)

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


