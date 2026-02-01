import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import UnifiedSidebar from '../../components/shared/UnifiedSidebar';

const { width } = Dimensions.get('window');

interface ParkingSlot {
    id: string;
    code: string;
    isOccupied: boolean;
    earnings: number;
    hours: number;
}

export default function ProviderDashboardScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'slots' | 'revenue' | 'ev' | 'settings'>('slots');
    const [showMenu, setShowMenu] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [currentUser, setCurrentUser] = useState({
        name: "Rajesh Kumar",
        email: "rajesh@cityplaza.com",
        phone: "+91 98765 43210",
        roleTitle: "Landlord Partner"
    });

    const slots: ParkingSlot[] = [
        { id: '1', code: 'A-01', isOccupied: true, earnings: 150, hours: 3 },
        { id: '2', code: 'A-02', isOccupied: false, earnings: 450, hours: 9 },
        { id: '3', code: 'B-01', isOccupied: true, earnings: 120, hours: 2.5 },
        { id: '4', code: 'B-02', isOccupied: false, earnings: 0, hours: 0 },
    ];

    const renderHeader = () => (
        <LinearGradient
            colors={['#6C5CE7', '#a29bfe']} // Indigo Gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="pt-16 pb-12 px-6 rounded-b-[40px] shadow-xl shadow-indigo-200"
        >
            <View className="flex-row justify-between items-center mb-8">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity
                        onPress={() => setShowMenu(true)}
                        className="w-12 h-12 bg-white/20 rounded-2xl justify-center items-center backdrop-blur-sm border border-white/20"
                    >
                        <Ionicons name="menu" size={28} color="white" />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-indigo-100 font-bold tracking-widest text-[10px] uppercase mb-1">{currentUser.name}</Text>
                        <Text className="text-white text-3xl font-black">My Parking Lot</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setShowMenu(true)} className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/20">
                    <Ionicons name="person-outline" size={22} color="white" />
                </TouchableOpacity>
            </View>

            <View className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-100 flex-row justify-between items-center -mb-20 border border-gray-50">
                <View className="flex-1 border-r border-gray-100 pr-4">
                    <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Total Revenue</Text>
                    <Text className="text-3xl font-black text-dark-900">₹ 4,500</Text>
                    <View className="flex-row items-center mt-1">
                        <Ionicons name="trending-up" size={14} color="#00B894" />
                        <Text className="text-teal-500 text-xs font-bold ml-1">+12% this week</Text>
                    </View>
                </View>
                <View className="pl-4 items-center">
                    <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Occupancy</Text>
                    <View className="w-16 h-16 rounded-full border-4 border-indigo-100 justify-center items-center">
                        <Text className="text-indigo-600 font-black text-lg">75%</Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );

    const renderSlotItem = ({ item, index }: { item: ParkingSlot; index: number }) => (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            style={{ width: (width - 48) / 2 }}
            className={`bg-white rounded-2xl p-4 mb-4 shadow-sm shadow-gray-200 border border-gray-50 ${index % 2 === 0 ? 'mr-4' : ''}`}
        >
            <View className="flex-row justify-between items-center mb-4">
                <View className={`w-10 h-10 rounded-xl justify-center items-center ${item.isOccupied ? 'bg-red-50' : 'bg-green-50'}`}>
                    <Text className={`font-black text-sm ${item.isOccupied ? 'text-red-500' : 'text-green-500'}`}>{item.code}</Text>
                </View>
                <View className={`w-2 h-2 rounded-full ${item.isOccupied ? 'bg-red-500' : 'bg-green-500'}`} />
            </View>

            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wide mb-1">{item.isOccupied ? 'Occupied' : 'Vacant'}</Text>
            {item.isOccupied ? (
                <View>
                    <Text className="text-dark-900 font-bold text-lg">₹ {item.earnings}</Text>
                    <Text className="text-xs text-indigo-500 font-bold">{item.hours} hrs active</Text>
                </View>
            ) : (
                <Text className="text-gray-300 font-bold text-lg">---</Text>
            )}
        </Animated.View>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'revenue':
                return (
                    <ScrollView className="flex-1 px-6 pt-24">
                        <Text className="text-dark-900 font-bold text-xl mb-4">Revenue Breakdown</Text>
                        <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                            <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-gray-50">
                                <Text className="text-gray-500 font-medium">Daily Average</Text>
                                <Text className="text-dark-900 font-bold text-lg">₹ 650</Text>
                            </View>
                            <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-gray-50">
                                <Text className="text-gray-500 font-medium">Monthly Est.</Text>
                                <Text className="text-dark-900 font-bold text-lg">₹ 19,500</Text>
                            </View>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-gray-500 font-medium">Platform Fee (15%)</Text>
                                <Text className="text-red-500 font-bold">-₹ 675</Text>
                            </View>
                        </View>
                    </ScrollView>
                );
            case 'ev':
                return (
                    <View className="flex-1 px-6 pt-24 items-center justify-center">
                        <Ionicons name="flash-outline" size={64} color="#6C5CE7" />
                        <Text className="text-xl font-bold text-dark-900 mt-4">EV Management</Text>
                        <Text className="text-gray-500 text-center mt-2 px-10">Monitor and manage your EV charging stations here.</Text>
                        <TouchableOpacity className="mt-6 bg-indigo-600 px-8 py-3 rounded-2xl">
                            <Text className="text-white font-bold">Add New Charger</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'settings':
                return (
                    <ScrollView className="flex-1 px-6 pt-24">
                        <Text className="text-dark-900 font-bold text-xl mb-4">Lot Settings</Text>
                        <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-50">
                                <Ionicons name="time-outline" size={24} color="#636E72" />
                                <Text className="ml-4 flex-1 font-bold text-dark-900">Operating Hours</Text>
                                <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-50">
                                <Ionicons name="cash-outline" size={24} color="#636E72" />
                                <Text className="ml-4 flex-1 font-bold text-dark-900">Pricing Rules</Text>
                                <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center p-4">
                                <Ionicons name="business-outline" size={24} color="#636E72" />
                                <Text className="ml-4 flex-1 font-bold text-dark-900">Business Profile</Text>
                                <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                );
            default:
                return (
                    <View className="flex-1 px-6 pt-24">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-dark-900 font-bold text-lg">Slot Status</Text>
                            <View className="flex-row items-center bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                                <Text className="text-xs font-bold text-gray-500 mr-2 uppercase">{isOnline ? 'Online' : 'Offline'}</Text>
                                <Switch
                                    value={isOnline}
                                    onValueChange={setIsOnline}
                                    trackColor={{ false: '#fab1a0', true: '#a29bfe' }}
                                    thumbColor={isOnline ? '#6C5CE7' : '#f1f2f6'}
                                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                                />
                            </View>
                        </View>

                        <FlatList
                            data={slots}
                            renderItem={renderSlotItem}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 100 }}
                        />
                    </View>
                );
        }
    };

    return (
        <View className="flex-1 bg-provider-bg">
            <StatusBar barStyle="light-content" />
            {renderHeader()}

            {renderContent()}

            <UnifiedSidebar
                visible={showMenu}
                onClose={() => setShowMenu(false)}
                role="provider"
                userData={currentUser}
                onUpdate={(name, phone) => setCurrentUser(prev => ({ ...prev, name, phone }))}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onLogout={() => router.back()}
            />
        </View>
    );
}
