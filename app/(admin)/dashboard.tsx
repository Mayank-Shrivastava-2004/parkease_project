import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

export default function AdminDashboardScreen() {
    const router = useRouter();

    const stats = [
        { label: 'Total Users', value: '1,204', icon: 'people', color: '#2D3436', bg: '#DFE6E9' },
        { label: 'Active Providers', value: '85', icon: 'business', color: '#0984E3', bg: '#E3F2FD' },
        { label: 'Revenue', value: '₹12.5L', icon: 'wallet', color: '#00B894', bg: '#E8F6F3' },
    ];

    const recentActivity = [
        { id: '1', title: 'New Provider Registration', desc: 'City Mall Parking applied', time: '10 min ago', status: 'pending' },
        { id: '2', title: 'Payment Report Generated', desc: 'February 2026', time: '2 hrs ago', status: 'success' },
        { id: '3', title: 'User Complaint #402', desc: 'Refund request initiated', time: '5 hrs ago', status: 'warning' },
    ];

    return (
        <View className="flex-1 bg-admin-bg">
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <LinearGradient
                colors={['#2D3436', '#636E72']} // Slate Gradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="pt-16 pb-6 px-6"
            >
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-gray-300 font-bold text-[10px] uppercase tracking-widest">Administrator</Text>
                        <Text className="text-white text-2xl font-black">System Overview</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white/10 rounded-full justify-center items-center backdrop-blur-md border border-white/10">
                        <Ionicons name="notifications-outline" size={22} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView className="flex-1 -mt-4 bg-gray-50 rounded-t-[30px] px-6 pt-8" showsVerticalScrollIndicator={false}>
                {/* Stats Grid */}
                <Text className="text-dark-900 font-bold text-lg mb-4">Key Metrics</Text>
                <View className="flex-row gap-4 mb-8">
                    <View className="flex-1 gap-4">
                        <View className="bg-white p-5 rounded-3xl shadow-sm shadow-gray-200 border border-gray-100">
                            <View className="w-10 h-10 rounded-full justify-center items-center mb-3" style={{ backgroundColor: stats[0].bg }}>
                                <Ionicons name={stats[0].icon as any} size={20} color={stats[0].color} />
                            </View>
                            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">{stats[0].label}</Text>
                            <Text className="text-2xl font-black text-dark-900 mt-1">{stats[0].value}</Text>
                        </View>
                        <View className="bg-white p-5 rounded-3xl shadow-sm shadow-gray-200 border border-gray-100">
                            <View className="w-10 h-10 rounded-full justify-center items-center mb-3" style={{ backgroundColor: stats[2].bg }}>
                                <Ionicons name={stats[2].icon as any} size={20} color={stats[2].color} />
                            </View>
                            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">{stats[2].label}</Text>
                            <Text className="text-2xl font-black text-dark-900 mt-1">{stats[2].value}</Text>
                        </View>
                    </View>

                    <View className="flex-1 bg-dark-800 rounded-3xl p-5 shadow-lg shadow-gray-400 justify-between">
                        <View>
                            <View className="w-12 h-12 bg-white/10 rounded-2xl justify-center items-center backdrop-blur-md border border-white/10">
                                <Ionicons name="pie-chart" size={24} color="white" />
                            </View>
                            <Text className="text-white text-lg font-bold mt-4">Growth</Text>
                            <Text className="text-gray-400 text-xs mt-1">+18% vs last month</Text>
                        </View>
                        <TouchableOpacity className="bg-white/10 py-3 rounded-xl items-center mt-4 border border-white/10">
                            <Text className="text-white font-bold text-[10px] uppercase tracking-wide">View Analytics</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recent Activity */}
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-dark-900 font-bold text-lg">Recent Activity</Text>
                    <Text className="text-gray-500 font-bold text-xs uppercase tracking-wide">View All</Text>
                </View>

                <View className="gap-3 pb-10">
                    {recentActivity.map((item, index) => (
                        <Animated.View key={item.id} entering={FadeInRight.delay(index * 150).springify()}>
                            <View className="bg-white p-4 rounded-2xl shadow-sm shadow-gray-100 border border-gray-100 flex-row items-center">
                                <View className={`w-1 h-10 rounded-full mr-4 ${item.status === 'success' ? 'bg-green-500' :
                                        item.status === 'warning' ? 'bg-orange-400' : 'bg-blue-400'
                                    }`} />
                                <View className="flex-1">
                                    <Text className="text-dark-900 font-bold text-sm">{item.title}</Text>
                                    <Text className="text-gray-400 text-xs mt-1">{item.desc}</Text>
                                </View>
                                <Text className="text-gray-300 text-[10px] font-bold uppercase">{item.time}</Text>
                            </View>
                        </Animated.View>
                    ))}
                </View>

                <TouchableOpacity
                    onPress={() => router.back()}
                    className="flex-row items-center justify-center py-4 mb-8 opacity-50"
                >
                    <Ionicons name="log-out-outline" size={20} color="#2D3436" />
                    <Text className="ml-2 text-dark-900 font-bold uppercase text-xs tracking-wide">Logout Session</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
