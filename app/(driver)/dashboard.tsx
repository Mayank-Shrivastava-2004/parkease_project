import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import UnifiedSidebar from '../../components/shared/UnifiedSidebar';

interface ParkingSlot {
    id: string;
    name: string;
    location: string;
    price: number;
    available: boolean;
    distance: string;
    rating: number;
}

export default function DriverDashboardScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'available' | 'bookings' | 'wallet' | 'profile'>('available');
    const [showMenu, setShowMenu] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        name: "Alex Driver",
        email: "alex.driver@gmail.com",
        phone: "+91 88776 65544",
        roleTitle: "Premium Partner"
    });

    const parkingSlots: ParkingSlot[] = [
        { id: '1', name: 'City Center Hub', location: 'Downtown, Block A', price: 50, available: true, distance: '0.5 km', rating: 4.8 },
        { id: '2', name: 'Grand Mall Plaza', location: 'Shopping District', price: 40, available: true, distance: '1.2 km', rating: 4.5 },
        { id: '3', name: 'Airport Premium', location: 'Terminal 3', price: 100, available: false, distance: '5.0 km', rating: 4.9 },
        { id: '4', name: 'Seaside Parking', location: 'Coastal Road', price: 60, available: true, distance: '3.5 km', rating: 4.2 },
    ];

    const handleBook = (slot: ParkingSlot) => {
        if (!slot.available) return;
        Alert.alert('Booking confirmed', `You booked ${slot.name}`);
    };

    const renderHeader = () => (
        <LinearGradient
            colors={['#00B894', '#00cec9']} // Teal Gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="pt-14 pb-8 px-6 rounded-b-[35px] shadow-lg shadow-teal-900/10 z-10"
        >
            <View className="flex-row justify-between items-center mb-6">
                <View className="flex-row items-center gap-3">
                    <TouchableOpacity
                        onPress={() => setShowMenu(true)}
                        className="w-12 h-12 bg-white/20 rounded-2xl justify-center items-center backdrop-blur-sm border border-white/20"
                    >
                        <Ionicons name="menu" size={28} color="white" />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-white/80 text-[10px] font-bold tracking-widest uppercase">Welcome back</Text>
                        <Text className="text-white text-xl font-bold">{currentUser.name}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setShowMenu(true)} className="w-10 h-10 bg-white/20 rounded-full justify-center items-center backdrop-blur-sm">
                    <Ionicons name="person-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* Quick Stats / Wallet Card */}
            <View className="bg-white/10 p-4 rounded-2xl flex-row justify-between items-center border border-white/10">
                <View>
                    <Text className="text-white/90 text-xs font-medium mb-1 uppercase tracking-wide">Wallet Balance</Text>
                    <Text className="text-white text-2xl font-bold">₹ 1,250.00</Text>
                </View>
                <TouchableOpacity onPress={() => setActiveTab('wallet')} className="bg-white px-5 py-2 rounded-xl shadow-sm">
                    <Text className="text-teal-600 font-bold text-xs uppercase">Top Up</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );

    const renderSlotItem = ({ item, index }: { item: ParkingSlot; index: number }) => (
        <Animated.View entering={FadeInDown.delay(index * 100).springify()}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => item.available && handleBook(item)}
                className={`bg-white rounded-3xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-50 ${!item.available ? 'opacity-60' : ''}`}
            >
                <View className="flex-row justify-between items-start mb-3">
                    <View>
                        <Text className="text-lg font-bold text-dark-900">{item.name}</Text>
                        <View className="flex-row items-center gap-1 mt-1">
                            <Ionicons name="location" size={12} color="#636E72" />
                            <Text className="text-xs text-gray-500 font-medium">{item.location}</Text>
                        </View>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${item.available ? 'bg-teal-50' : 'bg-red-50'}`}>
                        <Text className={`text-[10px] font-bold uppercase ${item.available ? 'text-teal-600' : 'text-red-500'}`}>
                            {item.available ? '● Available' : '● Full'}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center justify-between mt-2 pt-3 border-t border-gray-50">
                    <View className="flex-row items-center gap-3">
                        <View className="flex-row items-center bg-gray-50 px-2 py-1 rounded-lg">
                            <Ionicons name="time-outline" size={14} color="#636E72" />
                            <Text className="text-xs text-gray-600 ml-1 font-medium">{item.distance}</Text>
                        </View>
                        <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-lg">
                            <Ionicons name="star" size={14} color="#FDCB6E" />
                            <Text className="text-xs text-yellow-700 ml-1 font-bold">{item.rating}</Text>
                        </View>
                    </View>
                    <Text className="text-xl font-bold text-teal-600">₹{item.price}<Text className="text-xs text-gray-400 font-normal">/hr</Text></Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'bookings':
                return (
                    <View className="flex-1 justify-center items-center px-6">
                        <Ionicons name="ticket-outline" size={64} color="#00B894" />
                        <Text className="text-xl font-bold text-dark-900 mt-4">My Bookings</Text>
                        <Text className="text-gray-500 text-center mt-2 px-10">You don't have any active bookings yet. Explore nearby spots to book one!</Text>
                        <TouchableOpacity
                            onPress={() => setActiveTab('available')}
                            className="mt-6 bg-teal-500 px-8 py-3 rounded-2xl"
                        >
                            <Text className="text-white font-bold">Explore Now</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'wallet':
                return (
                    <View className="flex-1 px-6 pt-6">
                        <Text className="text-dark-900 font-bold text-xl mb-4">Wallet Transactions</Text>
                        <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            {[1, 2, 3].map((i) => (
                                <View key={i} className="flex-row justify-between items-center py-4 border-b border-gray-50">
                                    <View className="flex-row items-center">
                                        <View className="w-10 h-10 bg-teal-50 rounded-full justify-center items-center mr-3">
                                            <Ionicons name="arrow-up" size={20} color="#00B894" />
                                        </View>
                                        <View>
                                            <Text className="font-bold text-dark-900">Wallet Top-up</Text>
                                            <Text className="text-gray-400 text-xs">Oct {10 + i}, 2023</Text>
                                        </View>
                                    </View>
                                    <Text className="text-teal-600 font-bold">+₹500</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                );
            case 'profile':
                return (
                    <View className="flex-1 px-6 pt-6">
                        <View className="items-center mb-8">
                            <View className="w-24 h-24 bg-teal-100 rounded-full justify-center items-center mb-4">
                                <Ionicons name="person" size={48} color="#00B894" />
                            </View>
                            <Text className="text-2xl font-bold text-dark-900">{currentUser.name}</Text>
                            <Text className="text-gray-500 font-medium">{currentUser.email}</Text>
                        </View>
                        <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-50">
                                <View className="w-10 h-10 bg-gray-50 rounded-xl justify-center items-center mr-4">
                                    <Ionicons name="car-outline" size={22} color="#636E72" />
                                </View>
                                <Text className="flex-1 font-bold text-dark-900">Vehicle Details</Text>
                                <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-50">
                                <View className="w-10 h-10 bg-gray-50 rounded-xl justify-center items-center mr-4">
                                    <Ionicons name="notifications-outline" size={22} color="#636E72" />
                                </View>
                                <Text className="flex-1 font-bold text-dark-900">Notification Settings</Text>
                                <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center p-4">
                                <View className="w-10 h-10 bg-gray-50 rounded-xl justify-center items-center mr-4">
                                    <Ionicons name="shield-checkmark-outline" size={22} color="#636E72" />
                                </View>
                                <Text className="flex-1 font-bold text-dark-900">Privacy & Security</Text>
                                <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            default:
                return (
                    <View className="flex-1 px-6 pt-6">
                        <Text className="text-dark-900 font-bold text-lg mb-4">Nearby Spots</Text>
                        <FlatList
                            data={parkingSlots}
                            renderItem={renderSlotItem}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 150 }}
                        />
                    </View>
                );
        }
    };

    return (
        <View className="flex-1 bg-driver-bg">
            <StatusBar barStyle="light-content" />
            {renderHeader()}

            {renderContent()}

            {/* Bottom Floating Menu */}
            <View className="absolute bottom-8 left-6 right-6 bg-white rounded-2xl shadow-xl shadow-gray-200 p-2 flex-row justify-around items-center border border-gray-50">
                <TouchableOpacity
                    onPress={() => setActiveTab('available')}
                    className={`flex-1 py-3 items-center rounded-xl ${activeTab === 'available' ? 'bg-teal-50' : ''}`}
                >
                    <Ionicons name="map" size={24} color={activeTab === 'available' ? '#00B894' : '#B2BEC3'} />
                    {activeTab === 'available' && <Text className="text-[10px] font-bold text-teal-600 mt-1 uppercase">Explore</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('bookings')}
                    className={`flex-1 py-3 items-center rounded-xl ${activeTab === 'bookings' ? 'bg-teal-50' : ''}`}
                >
                    <Ionicons name="ticket" size={24} color={activeTab === 'bookings' ? '#00B894' : '#B2BEC3'} />
                    {activeTab === 'bookings' && <Text className="text-[10px] font-bold text-teal-600 mt-1 uppercase">Bookings</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('profile')}
                    className={`flex-1 py-3 items-center rounded-xl ${activeTab === 'profile' ? 'bg-teal-50' : ''}`}
                >
                    <Ionicons name="person" size={24} color={activeTab === 'profile' ? '#00B894' : '#B2BEC3'} />
                    {activeTab === 'profile' && <Text className="text-[10px] font-bold text-teal-600 mt-1 uppercase">Profile</Text>}
                </TouchableOpacity>
            </View>

            <UnifiedSidebar
                visible={showMenu}
                onClose={() => setShowMenu(false)}
                role="driver"
                userData={currentUser}
                onUpdate={(name, phone) => setCurrentUser(prev => ({ ...prev, name, phone }))}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onLogout={() => router.back()}
            />
        </View>
    );
}
