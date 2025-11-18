#  🍔 Food Delivery App

A modern food delivery app built with React Native, TypeScript, and Expo. This project uses Appwrite as the backend database, NativeWind for styling, and Sentry for error tracking. Built for learning purposes with a focus on React Native fundamentals and best practices.

## 📦 Technologies

- **React Native** - Mobile app framework
- **Expo** (~54.0.23) - Development platform and tooling
- **TypeScript** (~5.9.2) - Type-safe development
- **NativeWind** (4.2.1) - Tailwind CSS for React Native
- **Appwrite** - Backend-as-a-Service (Authentication, Database, Storage)
- **Sentry** (7.6.0) - Error tracking and monitoring
- **Zustand** (5.0.8) - State management
- **Expo Router** (~6.0.14) - File-based navigation

## 🦄 Features

Here's what you can do with this app:

- **User Authentication** - Sign up, sign in, and sign out functionality with Appwrite
- **Browse Menu** - View categorized food items with images, prices, and details
- **Search & Filter** - Search menu items and filter by categories
- **Shopping Cart** - Add/remove items with quantity management
- **User Profile** - View and manage personal information with beautiful gradient UI
- **Persistent State** - Cart and auth state preserved across sessions with Zustand
- **Database Seeding** - Pre-populated menu items, categories, and customizations

## 🚀 Getting Started

### Prerequisites

1. **Create Expo App:**
   ```bash
   npx create-expo-app@latest
   ```

2. **Create Accounts:**
   - Create an account on [Appwrite](https://appwrite.io)
   - Create an account on [Sentry](https://sentry.io)

### Installation

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Install Appwrite & Required Packages:**
   ```bash
   npx expo install react-native-appwrite react-native-url-polyfill
   ```

3. **Install Sentry:**
   ```bash
   npx @sentry/wizard@latest -i reactNative
   ```
   - Select SaaS
   - Authenticate and create project
   - Enable session replay

4. **Start Development Server:**
   ```bash
   npx expo start
   ```

### Reset Project

To reset the project to bare minimum code:
```bash
npm run reset-project
```
This script removes boilerplate code and provides a clean starting point.

## 📁 Project Structure

```
app/
├── (auth)/              # Authentication routes (sign-up, sign-in)
├── (tabs)/              # Bottom tab navigation (home, search, cart, profile)
├── (profile)/           # Profile-related pages (personal-info)
├── _layout.tsx          # Root layout with font loading and auth initialization
├── index.tsx            # Entry point with authentication check
└── global.css           # Global styles and Tailwind directives

components/              # Reusable UI components
lib/
├── appwrite.ts          # Appwrite configuration and API functions
├── seed.ts              # Database seeding script
└── data.ts              # Dummy data for seeding

store/                   # Zustand state management
├── auth.store.ts        # Authentication state
└── cart.store.ts        # Shopping cart state
```

## 📚 What I Learned

### 🎨 **Styling with NativeWind**

NativeWind brings Tailwind CSS to React Native with a familiar API:

```tsx
<View className="flex-1 bg-white px-5">
  <Text className="h1-bold text-dark-100">Hello World</Text>
</View>
```

**Configuration:**
- `tailwind.config.js` - Configure content paths and custom colors
- `metro.config.js` - Integrate NativeWind with Metro bundler
- Use `className` instead of `style` for Tailwind classes

### 🔤 **Custom Fonts with useFonts Hook**

Load custom fonts in `_layout.tsx`:

```tsx
import { useFonts } from 'expo-font';

const [fontsLoaded] = useFonts({
  'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
  'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  // ... more fonts
});
```

**Important:** Use `SplashScreen.preventAutoHideAsync()` to keep splash screen visible until fonts load, then `SplashScreen.hideAsync()` when ready.

### 📱 **Essential React Native Components**

#### **SafeAreaView** (from `react-native-safe-area-context`)
Ensures content doesn't get cut by notches or edges on any device:

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView className="flex-1">
  {/* Your content */}
</SafeAreaView>
```

**⚠️ Important:** Use the package version, NOT `react-native`'s built-in SafeAreaView.

#### **View vs ScrollView**
- `View` - Similar to `<div>` in web development
- `ScrollView` - Makes content scrollable when it exceeds screen limits
- **Note:** In React Native, the layout engine doesn't assume you want scrolling by default - you must explicitly wrap content in a scrollable container.

#### **FlatList** - Recommended for Long Lists
The optimized way to render lists in React Native (better than `.map()` for performance):

```tsx
<FlatList
  data={menuItems}
  keyExtractor={(item) => item.$id}
  renderItem={({ item }) => <MenuCard item={item} />}
  numColumns={2}
  showsVerticalScrollIndicator={false}
/>
```

**Benefits:**
- Only renders visible items (virtualization)
- Better performance with large datasets
- Built-in optimizations for scrolling

**⚠️ Critical Rule:** NEVER wrap a FlatList inside a ScrollView!

#### **Interactive Components**

**TouchableOpacity** - Button-like component with opacity feedback:
```tsx
<TouchableOpacity 
  onPress={() => handlePress()} 
  activeOpacity={0.7}
  className="bg-primary rounded-xl py-3"
>
  <Text>Click Me</Text>
</TouchableOpacity>
```

**Pressable** - More flexible, makes anything clickable:
```tsx
<Pressable onPress={() => console.log('Pressed!')}>
  <View>{/* Any content */}</View>
</Pressable>
```

**Difference:** TouchableOpacity provides visual feedback (opacity change), while Pressable is more customizable with press states.

#### **KeyboardAvoidingView**
Automatically adjusts view when keyboard appears:

```tsx
<KeyboardAvoidingView 
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
  <TextInput placeholder="Enter text" />
</KeyboardAvoidingView>
```

### 🛣️ **Expo Router - File-Based Navigation**

Expo Router uses the file system for routing (similar to Next.js):

#### **Route Groups**
`(auth)/` folder creates grouped routes without affecting the URL:
- `app/(auth)/sign-up.tsx` → `/sign-up`
- `app/(auth)/sign-in.tsx` → `/sign-in`

#### **Layout Files**
`_layout.tsx` - Uses `<Slot />` to render child routes (similar to Outlet in React Router):

```tsx
export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
}
```

#### **Navigation**
```tsx
import { router } from 'expo-router';

// Navigate to route
router.push('/sign-in');
router.replace('/');  // Replace (no back navigation)
router.back();        // Go back

// Conditional redirect
<Redirect href="/sign-in" />
```

### 🗂️ **Bottom Tabs Navigation**

Implemented with Expo Router's tabs, offering a familiar API similar to React Navigation:

```tsx
<Tabs screenOptions={{ tabBarActiveTintColor: '#EB920C' }}>
  <Tabs.Screen
    name="index"
    options={{
      title: 'Home',
      tabBarIcon: ({ color }) => <Text>🏠</Text>,
    }}
  />
</Tabs>
```

**Organizing Routes:**
- `app/(tabs)/` - Contains tab screens
- Use route groups like `app/(profile)/` for pages that shouldn't show as tabs
- Tabs automatically create bottom navigation bar

### ☁️ **Appwrite Backend**

Appwrite is an open-source, all-in-one backend platform providing authentication, database, storage, and more.

#### **Setup Process:**

1. **Create Project** on Appwrite Cloud
2. **Connect Platform** - Select React Native
3. **Enter Platform Details:**
   - Bundle ID: `com.amithedev.food_me`
   - Platform: Android/iOS

4. **Configure Database:**
   - Create database and get Database ID
   - Create collections (tables): `user`, `menu`, `categories`, `customizations`
   - Configure attributes (columns) for each table
   - Set up relationships between tables
   - **Important:** Enable proper permissions for each collection

5. **Storage Setup:**
   - Create storage bucket for images
   - Get Bucket ID
   - Configure permissions (READ for Any role to display images)

#### **Authentication Flow:**

```
User enters data
    ↓
Call Appwrite auth function
    ↓
Create new auth user (account.create)
    ↓
Sign in user (account.createEmailPasswordSession)
    ↓
Call Appwrite database
    ↓
Store user data in user collection
    ↓
Update Zustand state
```

#### **Appwrite Configuration (`lib/appwrite.ts`):**

```tsx
import { Client, Account, TablesDB, Storage } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const tablesDB = new TablesDB(client);
const storage = new Storage(client);
```

**Key API Functions:**
- `createUser()` - Create account, sign in, and store user data
- `signIn()` - Authenticate user and create session
- `getCurrentUser()` - Get current session and user data
- `getMenu()` - Fetch menu items with optional category filter
- `signOut()` - Delete current session

**⚠️ Important:** Use `react-native-url-polyfill/auto` import in `_layout.tsx` for Appwrite network requests to work properly.

#### **Database Seeding:**

Create `lib/seed.ts` for populating database with dummy data:

```tsx
// Clear existing data
await clearAll();

// Upload images to storage
const imageUrl = await uploadImageToStorage(imageURL, name);

// Create records using TablesDB
await tablesDB.createRow({
  databaseId,
  tableId: 'menu',
  rowId: ID.unique(),
  data: { name, description, price, image_url: imageUrl }
});
```

**Run seeding:** Import and call `seed()` function when needed.

### 🐛 **Sentry Error Tracking**

Sentry provides real-time error tracking and performance monitoring:

**What is Sentry?**
- Monitors application errors and crashes
- Tracks performance issues
- Provides session replay for debugging
- Captures error context and stack traces

**Integration:**
```tsx
import * as Sentry from '@sentry/react-native';

// Wrap root component
export default Sentry.wrap(RootLayout);

// Manual error catching
try {
  // code
} catch (error) {
  Sentry.captureException(error);
}
```

### 🎯 **Key Configuration Files**

#### **tsconfig.json**
Contains TypeScript compiler configuration:
- Path aliases (`@/` for project root)
- Compiler options
- Type checking rules

#### **app.json**
Contains app configuration:
```json
{
  "expo": {
    "name": "food-delivery",
    "slug": "food-delivery",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    // ... more config
  }
}
```

Includes app name, slug, version, splash screen, icons, and platform-specific settings.

## 💡 Best Practices Learned

1. **Always use SafeAreaView** from `react-native-safe-area-context`
2. **Use FlatList for long lists** instead of mapping arrays
3. **Never nest FlatList inside ScrollView**
4. **Import URL polyfill** before using Appwrite in React Native
5. **Use KeyboardAvoidingView** for forms to handle keyboard appearance
6. **Implement loading states** while fonts are loading
7. **Use route groups** `(folder)` to organize routes without affecting URLs
8. **Enable proper permissions** on Appwrite collections and storage buckets
9. **Use Zustand for global state** (simpler than Redux)
10. **Add error tracking** with Sentry from the start

## 🎨 UI Patterns Used

- **Gradient cards** with `expo-linear-gradient` for visual appeal
- **Bottom tab navigation** for main app sections
- **Nested navigation** with Stack inside Tabs
- **Pull-to-refresh** and search functionality
- **Optimistic UI updates** for cart actions
- **Persistent state** across app restarts

## 🔧 Environment Variables

Create `.env` file with:
```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
EXPO_PUBLIC_APPWRITE_PLATFORM=com.yourname.appname
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
EXPO_PUBLIC_APPWRITE_BUCKET_ID=your_bucket_id
EXPO_PUBLIC_APPWRITE_USER_TABLE_ID=user
EXPO_PUBLIC_APPWRITE_MENU_TABLE_ID=menu
EXPO_PUBLIC_APPWRITE_CATEGORIES_TABLE_ID=categories
EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_TABLE_ID=customizations
EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_TABLE_ID=menu_customizations
```

## 📝 Notes

- The app uses TablesDB API (newer Appwrite API) instead of deprecated Databases API
- Cart state persists using Zustand persist middleware
- Images are stored in Appwrite Storage and retrieved via `getFileViewURL()`
- Authentication state is managed globally with Zustand
- Database includes relationships between menu items, categories, and customizations

## 🚀 Future Improvements

- Implement payment methods page
- Add delivery addresses management
- Create order history
- Implement real-time order tracking
- Add user reviews and ratings
- Integrate push notifications
- Add dark mode support

## 👨‍💻 Author

Built by [ami-inn](https://github.com/ami-inn) for learning React Native development.

---

**Happy Coding! 🚀**



### ✏️ Managing Points and Drawing:


### 🎣 React Hooks and Rendering:



### 🎡 Advanced Event Handling:



### 📈 Overall Growth:



## 💭 How can it be improved?



## 🚦 Running the Project


## 🍿 Video

https://github.com/mirayatech/NinjaSketch/assets/7