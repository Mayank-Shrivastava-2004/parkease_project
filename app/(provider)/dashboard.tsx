import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    StatusBar,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

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
    const [isOnline, setIsOnline] = useState(true);

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
            <View className="flex-row justify-between items-start mb-8">
                <View>
                    <Text className="text-indigo-100 font-bold tracking-widest text-[10px] uppercase mb-1">Provider Console</Text>
                    <Text className="text-white text-3xl font-black">My Parking Lot</Text>
                </View>
                <TouchableOpacity onPress={() => router.back()} className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/20">
                    <Ionicons name="power" size={20} color="white" />
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

    return (
        <View className="flex-1 bg-provider-bg">
            <StatusBar barStyle="light-content" />
            {renderHeader()}

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
        </View>
    );
}
