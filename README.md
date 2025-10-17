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

You can import everything at once:

```typescript
import { flxUtils } from "flxhelpers";
```

Or import individual modules:

```typescript
// UUID
import { v4 as uuidv4 } from "flxhelpers";

// Bcrypt helpers
import { hash, compare } from "flxhelpers";

// Custom utilities
import { flxUtils } from "flxhelpers";
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