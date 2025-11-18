import { ID } from "react-native-appwrite";
import { appwriteConfig, tablesDB, storage } from "./appwrite";
import dummyData from "./data";

interface Category {
    name: string;
    description: string;
}

interface Customization {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[]; // list of customization names
}

interface DummyData {
    categories: Category[];
    customizations: Customization[];
    menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

async function clearAll(tableId: string): Promise<void> {
    const list = await tablesDB.listRows({
        databaseId: appwriteConfig.databaseId,
        tableId: tableId
    });

    await Promise.all(
        list.rows.map((row) =>
            tablesDB.deleteRow({
                databaseId: appwriteConfig.databaseId,
                tableId: tableId,
                rowId: row.$id
            })
        )
    );
}

async function clearStorage(): Promise<void> {
    const list = await storage.listFiles(appwriteConfig.bucketId);

    await Promise.all(
        list.files.map((file) =>
            storage.deleteFile(appwriteConfig.bucketId, file.$id)
        )
    );
}

async function uploadImageToStorage(imageUrl: string) {
    try {
        console.log(`    → Fetching image from URL...`);
        const response = await fetch(imageUrl);
        
        if (!response.ok) {
            console.warn(`    ⚠ Failed to fetch image, using original URL`);
            return imageUrl; // Fallback to original URL
        }

        const blob = await response.blob();
        console.log(`    → Got blob, size: ${blob.size} bytes, type: ${blob.type}`);

        // Create File object for React Native
        const fileName = imageUrl.split("/").pop() || `file-${Date.now()}.png`;
        const file = {
            name: fileName,
            type: blob.type || 'image/png',
            size: blob.size,
            uri: imageUrl,
        } as any;

        console.log(`    → Uploading to Appwrite storage...`);
        const uploadedFile = await storage.createFile(
            appwriteConfig.bucketId,
            ID.unique(),
            file
        );

        const fileUrl = storage.getFileViewURL(appwriteConfig.bucketId, uploadedFile.$id);
        console.log(`    ✓ Uploaded successfully: ${uploadedFile.$id}`);
        return fileUrl;
    } catch (error: any) {
        console.warn(`    ⚠ Upload failed (${error.message}), using original URL`);
        return imageUrl; // Fallback to original URL if upload fails
    }
}

async function seed(): Promise<void> {
    try {
        console.log("🌱 Starting seed process...");
        
        // 1. Clear all
        console.log("🧹 Clearing existing data...");
        await clearAll(appwriteConfig.categoriesTableId);
        await clearAll(appwriteConfig.customizationsTableId);
        await clearAll(appwriteConfig.menuTableId);
        await clearAll(appwriteConfig.menuCustomizationsTableId);
        await clearStorage();
        console.log("✅ Cleared all existing data");

        // 2. Create Categories
        console.log("📁 Creating categories...");
        const categoryMap: Record<string, string> = {};
        for (const cat of data.categories) {
            const row = await tablesDB.createRow({
                databaseId: appwriteConfig.databaseId,
                tableId: appwriteConfig.categoriesTableId,
                rowId: ID.unique(),
                data: cat
            });
            categoryMap[cat.name] = row.$id;
            console.log(`  ✓ Created category: ${cat.name}`);
        }
        console.log(`✅ Created ${data.categories.length} categories`);

        // 3. Create Customizations
        console.log("🎨 Creating customizations...");
        const customizationMap: Record<string, string> = {};
        for (const cus of data.customizations) {
            const row = await tablesDB.createRow({
                databaseId: appwriteConfig.databaseId,
                tableId: appwriteConfig.customizationsTableId,
                rowId: ID.unique(),
                data: {
                    name: cus.name,
                    price: cus.price,
                    type: cus.type,
                }
            });
            customizationMap[cus.name] = row.$id;
            console.log(`  ✓ Created customization: ${cus.name}`);
        }
        console.log(`✅ Created ${data.customizations.length} customizations`);

        // 4. Create Menu Items
        console.log("🍔 Creating menu items...");
        const menuMap: Record<string, string> = {};
        
        for (let i = 0; i < data.menu.length; i++) {
            const item = data.menu[i];
            try {
                console.log(`\n[${i + 1}/${data.menu.length}] Processing: ${item.name}`);
                
                console.log(`  → Uploading image...`);
                const uploadedImage = await uploadImageToStorage(item.image_url);
                console.log(`  ✓ Image uploaded: ${uploadedImage}`);
                
                const menuData = {
                    name: item.name,
                    description: item.description,
                    image_url: uploadedImage,
                    price: item.price,
                    ration: item.rating, // Fixed: column name is 'ration' not 'rating'
                    calories: item.calories,
                    protein: item.protein,
                    categories: categoryMap[item.category_name],
                };

                console.log(`  → Creating menu row...`);
                const row = await tablesDB.createRow({
                    databaseId: appwriteConfig.databaseId,
                    tableId: appwriteConfig.menuTableId,
                    rowId: ID.unique(),
                    data: menuData
                });

                console.log(`  ✓ Menu item created with ID: ${row.$id}`);
                menuMap[item.name] = row.$id;

                // 5. Create menu_customizations
                console.log(`  → Creating ${item.customizations.length} customization links...`);
                for (const cusName of item.customizations) {
                    if (customizationMap[cusName]) {
                        await tablesDB.createRow({
                            databaseId: appwriteConfig.databaseId,
                            tableId: appwriteConfig.menuCustomizationsTableId,
                            rowId: ID.unique(),
                            data: {
                                menu: row.$id,
                                customizations: customizationMap[cusName],
                            }
                        });
                        console.log(`    ✓ Linked: ${cusName}`);
                    } else {
                        console.warn(`    ⚠ Customization not found: ${cusName}`);
                    }
                }
                console.log(`  ✅ Completed: ${item.name}`);
            } catch (error: any) {
                console.error(`\n❌ ERROR creating menu item "${item.name}":`, error);
                console.error(`Error details:`, {
                    message: error.message,
                    code: error.code,
                    type: error.type
                });
                throw error;
            }
        }
        console.log(`\n✅ Created ${data.menu.length} menu items`);
        console.log("\n🎉 Seeding complete!");
    } catch (error: any) {
        console.error("\n❌ SEED FAILED:", error);
        console.error("Error message:", error.message);
        throw error;
    }
}

export default seed;