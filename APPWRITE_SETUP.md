# Appwrite TablesDB Setup Guide

## ✅ What's Been Updated

Your project has been migrated from the old Databases API to the new **TablesDB API**. Here's what changed:

- `Databases` → `TablesDB`
- `collections` → `tables`
- `documents` → `rows`
- `createDocument()` → `createRow()`
- `listDocuments()` → `listRows()`

## 📋 Required Tables Setup

Go to your Appwrite Console and create the following tables in your database:

### 1. Users Table
**Table Name:** `users`
**Columns:**
- `email` (String, 255)
- `name` (String, 255)
- `accountId` (String, 255)
- `avatar` (String, 500)

**Permissions:**
- Any: CREATE, READ

### 2. Categories Table
**Table Name:** `categories`
**Columns:**
- `name` (String, 255)
- `description` (String, 500)

**Permissions:**
- Any: READ

### 3. Menu Table
**Table Name:** `menu`
**Columns:**
- `name` (String, 255)
- `price` (Float)
- `image_url` (String, 500)
- `description` (String, 1000)
- `calories` (Integer)
- `protein` (Integer)
- `rating` (Float)
- `type` (String, 100)
- `categories` (String, 255) - Comma-separated category IDs

**Permissions:**
- Any: READ

### 4. Customizations Table
**Table Name:** `customizations`
**Columns:**
- `name` (String, 255)
- `price` (Float)
- `type` (String, 100)

**Permissions:**
- Any: READ

### 5. Menu Customizations Table (Junction Table)
**Table Name:** `menu_customizations`
**Columns:**
- `menu_id` (String, 255)
- `customization_id` (String, 255)

**Permissions:**
- Any: READ

## 🔧 Configuration Steps

### Step 1: Create Database
1. Go to Appwrite Console → Databases
2. Click **Create database**
3. Name it (e.g., "food_delivery")
4. Copy the **Database ID**

### Step 2: Create Tables
For each table above:
1. Click **Create table**
2. Enter the table name
3. Copy the **Table ID**
4. Go to **Columns** tab
5. Click **Create column** for each column listed
6. Go to **Settings** → **Permissions**
7. Add permissions as specified

### Step 3: Create Storage Bucket (for images)
1. Go to Storage
2. Click **Create bucket**
3. Name it (e.g., "menu_images")
4. Copy the **Bucket ID**
5. Set permissions: Any: READ, CREATE

### Step 4: Update .env File
Replace the placeholder values in `.env` with your actual IDs:

```env
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
EXPO_PUBLIC_APPWRITE_BUCKET_ID=your_bucket_id_here
EXPO_PUBLIC_APPWRITE_USER_TABLE_ID=your_user_table_id_here
EXPO_PUBLIC_APPWRITE_CATEGORIES_TABLE_ID=your_categories_table_id_here
EXPO_PUBLIC_APPWRITE_MENU_TABLE_ID=your_menu_table_id_here
EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_TABLE_ID=your_customizations_table_id_here
EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_TABLE_ID=your_menu_customizations_table_id_here
```

## 🚀 Usage Examples

### Create a User
```typescript
import { createUser } from '@/lib/appwrite';

await createUser({
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe'
});
```

### Sign In
```typescript
import { signIn } from '@/lib/appwrite';

await signIn({
  email: 'user@example.com',
  password: 'password123'
});
```

### Get Categories
```typescript
import { getCategories } from '@/lib/appwrite';

const categories = await getCategories();
```

### Get Menu Items
```typescript
import { getMenu } from '@/lib/appwrite';

// All menu items
const allItems = await getMenu({});

// Filter by category
const burgers = await getMenu({ category: 'category_id_here' });

// Search by name
const results = await getMenu({ query: 'pizza' });
```

### Get Current User
```typescript
import { getCurrentUser } from '@/lib/appwrite';

const user = await getCurrentUser();
```

## 📝 Type Safety

All functions use TypeScript interfaces for type safety:

```typescript
interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface GetMenuParams {
  category?: string;
  query?: string;
}
```

## 🔄 Migration Checklist

- [x] Updated to TablesDB API
- [x] Changed collections → tables
- [x] Changed documents → rows
- [x] Updated method names (createDocument → createRow, etc.)
- [x] Added proper error handling
- [x] Exported Query and ID utilities
- [x] Fixed type definitions
- [ ] Create database in Appwrite Console
- [ ] Create all required tables
- [ ] Update .env with actual IDs
- [ ] Test authentication flow
- [ ] Test data fetching

## 📚 Additional Resources

- [Appwrite TablesDB Documentation](https://appwrite.io/docs/products/databases)
- [React Native Appwrite SDK](https://appwrite.io/docs/sdks#client)
- [Query Examples](https://appwrite.io/docs/products/databases/queries)

## ⚠️ Important Notes

1. **Restart Expo** after updating `.env` file
2. All table IDs must be copied from your Appwrite Console
3. Set proper permissions on each table for security
4. Use environment variables for sensitive data
5. TablesDB uses `rows` instead of `documents`
