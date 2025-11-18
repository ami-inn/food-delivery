import {Text, TouchableOpacity, Image, Platform, View} from 'react-native'
import {MenuItem} from "@/type";
import {useCartStore} from "@/store/cart.store";
import { useState } from 'react';

const MenuCard = ({ item: { $id, image_url, name, price }}: { item: MenuItem}) => {
    const { addItem } = useCartStore();
    const [imageError, setImageError] = useState(false);
    
    // Use the image_url directly - it already has the project parameter from getFileViewURL
    const imageUrl = image_url;

    // Add cache busting and proper headers for Appwrite
    const imageSource = {
        uri: imageUrl,
        cache: 'force-cache' as const,
    };

    return (
        <TouchableOpacity className="menu-card" style={Platform.OS === 'android' ? { elevation: 10, shadowColor: '#878787'}: {}}>
            {!imageError ? (
                <Image 
                    source={imageSource} 
                    className="size-32 absolute -top-10" 
                    resizeMode="contain"
                    onError={(error) => {
                        console.warn(`❌ Image failed to load for "${name}":`, imageUrl);
                        console.warn('Error:', error.nativeEvent?.error);
                        setImageError(true);
                    }}
                    onLoad={() => {
                        console.log(`✅ Image loaded successfully for: ${name}`);
                    }}
                />
            ) : (
                <View className="size-32 absolute -top-10 bg-gray-100 rounded-lg items-center justify-center">
                    <Text className="text-gray-400 text-2xl">🍔</Text>
                </View>
            )}
            <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={1}>{name}</Text>
            <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>
            <TouchableOpacity onPress={() => addItem({ id: $id, name, price, image_url: imageUrl, customizations: []})}>
                <Text className="paragraph-bold text-primary">Add to Cart +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default MenuCard