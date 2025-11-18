import { CreateUserParams, SignInParams, GetMenuParams } from "@/type";
import {
  Client,
  Account,
  TablesDB,
  Storage,
  ID,
  Avatars,
  Query,
} from "react-native-appwrite";

// Appwrite configuration
export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.amithedev.food_me",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
  userTableId: process.env.EXPO_PUBLIC_APPWRITE_USER_TABLE_ID!,
  categoriesTableId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_TABLE_ID!,
  menuTableId: process.env.EXPO_PUBLIC_APPWRITE_MENU_TABLE_ID!,
  customizationsTableId: process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_TABLE_ID!,
  menuCustomizationsTableId: process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_TABLE_ID!,
};

// Initialize Appwrite client
export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

// Initialize Appwrite services
export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

// Export ID and Query utilities
export { ID, Query };

/**
 * Create a new user account and profile
 */
export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    console.log("Creating user with email:", email);
    console.log("Creating user with name:", name);
    console.log("Creating user with password:", password);

    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Failed to create account");

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    const userData = {
      name: name,
      email: email,
      avatar: avatarUrl.toString(),
      accountId: newAccount.$id
    };

    console.log("Creating row with data:", userData);

    const response = await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userTableId,
      rowId: ID.unique(),
      data: userData
    });

    console.log("User created:", response);
    return response;
  } catch (error) {
    console.error("Create user error:", error);
    throw new Error(error as string);
  }
};


/**
 * Sign in with email and password
 */
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Sign in error:", error);
    throw new Error(error as string);
  }
};

/**
 * Get the current logged-in user
 */
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No account found");

    const currentUser = await tablesDB.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userTableId,
      queries: [Query.equal('accountId', currentAccount.$id)],
    });

    if (!currentUser || currentUser.rows.length === 0) {
      throw new Error("User not found");
    }

    return currentUser.rows[0];
  } catch (error) {
    console.error("Get current user error:", error);
    throw new Error(error as string);
  }
};

/**
 * Get menu items with optional filtering by category and search query
 */
export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    
    // Note: Query.search() requires a fulltext index on 'name' attribute
    // To enable search, create a fulltext index in Appwrite Console:
    // Databases → menu table → Indexes → Create Index (Type: Fulltext, Attribute: name)
    // For now, we fetch all and filter client-side if search is provided
    
    const menus = await tablesDB.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.menuTableId,
      queries,
    });

    // Client-side filtering if query is provided and no fulltext index exists
    if (query && menus.rows.length > 0) {
      const filteredRows = menus.rows.filter((item: any) => 
        item.name?.toLowerCase().includes(query.toLowerCase())
      );
      return filteredRows;
    }

    return menus.rows;
  } catch (error) {
    console.error("Get menu error:", error);
    throw new Error(error as string);
  }
};

/**
 * Get all categories
 */
export const getCategories = async () => {
  try {
    const categories = await tablesDB.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.categoriesTableId,
    });

    return categories.rows;
  } catch (error) {
    console.error("Get categories error:", error);
    throw new Error(error as string);
  }
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Sign out error:", error);
    throw new Error(error as string);
  }
};


