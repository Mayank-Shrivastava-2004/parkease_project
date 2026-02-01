import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Driver {
    id: string;
    name: string;
    email: string;
    phone: string;
    vehicleNumber: string;
    vehicleType: string;
    status: 'active' | 'inactive' | 'suspended';
    joinedDate: string;
    totalBookings: number;
    activeBooking?: {
        location: string;
        slot: string;
        timeRemaining: string;
        amount: number;
    };
    walletBalance: number;
    rating: number;
    lastActive: string;
}

export default function DriverManagement() {
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Dynamic state for drivers
    const [drivers, setDrivers] = useState<Driver[]>([
        {
            id: '1',
            name: 'Arjun Mehta',
            email: 'arjun@example.com',
            phone: '+91 98765 43210',
            vehicleNumber: 'MH 02 AB 1234',
            vehicleType: 'Sedan',
            status: 'active',
            joinedDate: '15 Jan 2026',
            totalBookings: 124,
            activeBooking: {
                location: 'City Center Plaza',
                slot: 'A-15',
                timeRemaining: '2h 15m',
                amount: 100
            },
            walletBalance: 1250,
            rating: 4.8,
            lastActive: '5 mins ago'
        },
        {
            id: '2',
            name: 'Priya Sharma',
            email: 'priya@example.com',
            phone: '+91 98765 43211',
            vehicleNumber: 'DL 01 CD 5678',
            vehicleType: 'SUV',
            status: 'active',
            joinedDate: '10 Jan 2026',
            totalBookings: 89,
            walletBalance: 850,
            rating: 4.6,
            lastActive: '12 mins ago'
        },
        {
            id: '3',
            name: 'Rahul Singh',
            email: 'rahul@example.com',
            phone: '+91 98765 43212',
            vehicleNumber: 'KA 03 EF 9012',
            vehicleType: 'Hatchback',
            status: 'inactive',
            joinedDate: '5 Jan 2026',
            totalBookings: 45,
            walletBalance: 320,
            rating: 4.2,
            lastActive: '2 days ago'
        },
        {
            id: '4',
            name: 'Sneha Patel',
            email: 'sneha@example.com',
            phone: '+91 98765 43213',
            vehicleNumber: 'GJ 05 GH 3456',
            vehicleType: 'EV Sedan',
            status: 'active',
            joinedDate: '20 Dec 2025',
            totalBookings: 156,
            activeBooking: {
                location: 'Grand Mall Parking',
                slot: 'B-08',
                timeRemaining: '45m',
                amount: 50
            },
            walletBalance: 2100,
            rating: 4.9,
            lastActive: '2 mins ago'
        },
        {
            id: '5',
            name: 'Vikram Rao',
            email: 'vikram@example.com',
            phone: '+91 98765 43214',
            vehicleNumber: 'TN 07 IJ 7890',
            vehicleType: 'Sedan',
            status: 'suspended',
            joinedDate: '1 Dec 2025',
            totalBookings: 67,
            walletBalance: 150,
            rating: 3.5,
            lastActive: '1 week ago'
        }
    ]);

    const filteredDrivers = drivers.filter(driver => {
        const matchesStatus = filterStatus === 'all' || driver.status === filterStatus;
        const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleSuspend = (driver: Driver) => {
        Alert.alert('Suspend Driver', `Are you sure you want to suspend ${driver.name}?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Suspend',
                style: 'destructive',
                onPress: () => {
                    setDrivers(prev => prev.map(d => d.id === driver.id ? { ...d, status: 'suspended' } : d));
                    Alert.alert('Suspended', `${driver.name} has been suspended.`);
                    setShowDetailsModal(false);
                }
            }
        ]);
    };

    const handleActivate = (driver: Driver) => {
        setDrivers(prev => prev.map(d => d.id === driver.id ? { ...d, status: 'active' } : d));
        Alert.alert('Activated', `${driver.name} is now active.`);
        setShowDetailsModal(false);
    };

    const handleReactivate = (driver: Driver) => {
        Alert.alert(
            'Reactivate Driver',
            `Reactivate ${driver.name}'s account?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reactivate',
                    onPress: () => {
                        console.log('Reactivated:', driver.id);
                        Alert.alert('Success', `${driver.name} has been reactivated.`);
                        setShowDetailsModal(false);
                    }
                }
            ]
        );
    };

    const handleSendNotification = (driver: Driver) => {
        Alert.alert('Send Notification', `Send a notification to ${driver.name}?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Send', onPress: () => console.log('Notification sent to:', driver.id) }
        ]);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-50';
            case 'inactive': return 'bg-gray-50';
            case 'suspended': return 'bg-red-50';
            default: return 'bg-gray-50';
        }
    };

    const getStatusTextColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-600';
            case 'inactive': return 'text-gray-600';
            case 'suspended': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const renderDriverCard = (driver: Driver, index: number) => (
        <Animated.View
            key={driver.id}
            entering={FadeInDown.delay(index * 100).springify()}
        >
            <TouchableOpacity
                onPress={() => {
                    setSelectedDriver(driver);
                    setShowDetailsModal(true);
                }}
                className="bg-white rounded-2xl p-4 mb-3 shadow-sm shadow-gray-200 border border-gray-100"
            >
                <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                        <View className="flex-row items-center gap-2">
                            <Text className="text-dark-900 font-bold text-base">{driver.name}</Text>
                            {driver.status === 'active' && (
                                <View className="w-2 h-2 bg-green-500 rounded-full" />
                            )}
                        </View>
                        <Text className="text-gray-500 text-sm mt-1">{driver.vehicleNumber}</Text>
                        <View className="flex-row items-center gap-1 mt-1">
                            <Ionicons name="car" size={12} color="#636E72" />
                            <Text className="text-gray-400 text-xs">{driver.vehicleType}</Text>
                        </View>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${getStatusColor(driver.status)}`}>
                        <Text className={`text-[10px] font-bold uppercase ${getStatusTextColor(driver.status)}`}>
                            {driver.status}
                        </Text>
                    </View>
                </View>

                {driver.activeBooking && (
                    <View className="bg-teal-50 rounded-xl p-3 mb-3 border border-teal-100">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="time" size={14} color="#00B894" />
                            <Text className="text-teal-700 text-xs font-bold ml-1 uppercase">Active Booking</Text>
                        </View>
                        <Text className="text-dark-900 text-sm font-bold">{driver.activeBooking.location}</Text>
                        <View className="flex-row justify-between items-center mt-1">
                            <Text className="text-gray-600 text-xs">Slot {driver.activeBooking.slot} • {driver.activeBooking.timeRemaining} left</Text>
                            <Text className="text-teal-600 text-sm font-bold">₹{driver.activeBooking.amount}</Text>
                        </View>
                    </View>
                )}

                <View className="flex-row items-center justify-between border-t border-gray-100 pt-3">
                    <View className="flex-row items-center gap-3">
                        <View className="flex-row items-center">
                            <Ionicons name="star" size={14} color="#FDCB6E" />
                            <Text className="text-dark-900 text-sm font-bold ml-1">{driver.rating}</Text>
                        </View>
                        <Text className="text-gray-400 text-xs">{driver.totalBookings} trips</Text>
                    </View>
                    <Text className="text-teal-600 text-sm font-bold">₹{driver.walletBalance}</Text>
                </View>

                <Text className="text-gray-300 text-[10px] mt-2">Last active: {driver.lastActive}</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-white px-6 pt-4 pb-4 border-b border-gray-100">
                <Text className="text-dark-900 font-bold text-2xl mb-4">Driver Management</Text>

                {/* Stats Overview */}
                <View className="flex-row gap-3 mb-4">
                    <View className="flex-1 bg-green-50 rounded-xl p-3">
                        <Text className="text-green-600 text-2xl font-black">{drivers.filter(d => d.status === 'active').length}</Text>
                        <Text className="text-green-700 text-[10px] font-bold uppercase mt-1">Active</Text>
                    </View>
                    <View className="flex-1 bg-gray-50 rounded-xl p-3">
                        <Text className="text-gray-600 text-2xl font-black">{drivers.filter(d => d.status === 'inactive').length}</Text>
                        <Text className="text-gray-700 text-[10px] font-bold uppercase mt-1">Inactive</Text>
                    </View>
                    <View className="flex-1 bg-red-50 rounded-xl p-3">
                        <Text className="text-red-600 text-2xl font-black">{drivers.filter(d => d.status === 'suspended').length}</Text>
                        <Text className="text-red-700 text-[10px] font-bold uppercase mt-1">Suspended</Text>
                    </View>
                </View>

                {/* Search Bar */}
                <View className="bg-gray-50 rounded-2xl px-4 py-3 flex-row items-center mb-4">
                    <Ionicons name="search" size={20} color="#636E72" />
                    <TextInput
                        placeholder="Search drivers..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        className="flex-1 ml-2 text-dark-900"
                        placeholderTextColor="#B2BEC3"
                    />
                </View>

                {/* Filter Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
                    {(['all', 'active', 'inactive', 'suspended'] as const).map((status) => (
                        <TouchableOpacity
                            key={status}
                            onPress={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-xl ${filterStatus === status ? 'bg-teal-600' : 'bg-gray-100'}`}
                        >
                            <Text className={`text-xs font-bold uppercase ${filterStatus === status ? 'text-white' : 'text-gray-500'}`}>
                                {status}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Driver List */}
            <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
                <Text className="text-gray-500 text-xs mb-4">
                    {filteredDrivers.length} driver{filteredDrivers.length !== 1 ? 's' : ''} found
                </Text>
                {filteredDrivers.map((driver, index) => renderDriverCard(driver, index))}
                <View className="h-20" />
            </ScrollView>

            {/* Details Modal */}
            <Modal
                visible={showDetailsModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowDetailsModal(false)}
            >
                {selectedDriver && (
                    <View className="flex-1 bg-gray-50">
                        {/* Modal Header */}
                        <View className="bg-teal-600 px-6 pt-16 pb-6">
                            <View className="flex-row justify-between items-center">
                                <View className="flex-1">
                                    <Text className="text-white text-2xl font-black">{selectedDriver.name}</Text>
                                    <Text className="text-teal-100 text-sm mt-1">{selectedDriver.vehicleNumber}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => setShowDetailsModal(false)}
                                    className="w-10 h-10 bg-white/20 rounded-full justify-center items-center"
                                >
                                    <Ionicons name="close" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
                            {/* Status Badge */}
                            <View className={`self-start px-4 py-2 rounded-full ${getStatusColor(selectedDriver.status)} mb-6`}>
                                <Text className={`text-sm font-bold uppercase ${getStatusTextColor(selectedDriver.status)}`}>
                                    {selectedDriver.status}
                                </Text>
                            </View>

                            {/* Active Booking (if any) */}
                            {selectedDriver.activeBooking && (
                                <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-100">
                                    <Text className="text-dark-900 font-bold text-lg mb-4">Active Booking</Text>
                                    <View className="gap-3">
                                        <View className="flex-row justify-between items-center">
                                            <Text className="text-gray-500 text-sm">Location</Text>
                                            <Text className="text-dark-900 text-base font-bold">{selectedDriver.activeBooking.location}</Text>
                                        </View>
                                        <View className="flex-row justify-between items-center">
                                            <Text className="text-gray-500 text-sm">Slot Number</Text>
                                            <Text className="text-dark-900 text-base font-bold">{selectedDriver.activeBooking.slot}</Text>
                                        </View>
                                        <View className="flex-row justify-between items-center">
                                            <Text className="text-gray-500 text-sm">Time Remaining</Text>
                                            <Text className="text-orange-600 text-base font-bold">{selectedDriver.activeBooking.timeRemaining}</Text>
                                        </View>
                                        <View className="flex-row justify-between items-center">
                                            <Text className="text-gray-500 text-sm">Amount</Text>
                                            <Text className="text-teal-600 text-base font-bold">₹{selectedDriver.activeBooking.amount}</Text>
                                        </View>
                                    </View>
                                </View>
                            )}

                            {/* Contact Information */}
                            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-100">
                                <Text className="text-dark-900 font-bold text-lg mb-4">Contact Information</Text>
                                <View className="gap-3">
                                    <View className="flex-row items-center">
                                        <Ionicons name="mail" size={20} color="#636E72" />
                                        <Text className="text-gray-600 text-sm ml-3">{selectedDriver.email}</Text>
                                    </View>
                                    <View className="flex-row items-center">
                                        <Ionicons name="call" size={20} color="#636E72" />
                                        <Text className="text-gray-600 text-sm ml-3">{selectedDriver.phone}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Vehicle Information */}
                            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-100">
                                <Text className="text-dark-900 font-bold text-lg mb-4">Vehicle Information</Text>
                                <View className="gap-3">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">Vehicle Type</Text>
                                        <Text className="text-dark-900 text-base font-bold">{selectedDriver.vehicleType}</Text>
                                    </View>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">Registration Number</Text>
                                        <Text className="text-dark-900 text-base font-bold">{selectedDriver.vehicleNumber}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Account Information */}
                            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-100">
                                <Text className="text-dark-900 font-bold text-lg mb-4">Account Information</Text>
                                <View className="gap-3">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">Joined On</Text>
                                        <Text className="text-dark-900 text-base font-bold">{selectedDriver.joinedDate}</Text>
                                    </View>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">Total Bookings</Text>
                                        <Text className="text-dark-900 text-base font-bold">{selectedDriver.totalBookings}</Text>
                                    </View>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">Rating</Text>
                                        <View className="flex-row items-center">
                                            <Ionicons name="star" size={18} color="#FDCB6E" />
                                            <Text className="text-dark-900 text-base font-bold ml-1">{selectedDriver.rating}</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">Wallet Balance</Text>
                                        <Text className="text-teal-600 text-base font-bold">₹{selectedDriver.walletBalance}</Text>
                                    </View>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">Last Active</Text>
                                        <Text className="text-gray-600 text-sm">{selectedDriver.lastActive}</Text>
                                    </View>
                                </View>
                            </View>

                            <View className="h-100" />
                        </ScrollView>

                        {/* Action Buttons */}
                        <View className="bg-white px-6 py-4 border-t border-gray-100 gap-3">
                            <TouchableOpacity
                                onPress={() => handleSendNotification(selectedDriver)}
                                className="bg-blue-500 py-4 rounded-xl items-center flex-row justify-center"
                            >
                                <Ionicons name="notifications" size={20} color="white" />
                                <Text className="text-white font-bold text-sm uppercase tracking-wide ml-2">Send Notification</Text>
                            </TouchableOpacity>

                            {selectedDriver.status !== 'suspended' && (
                                <TouchableOpacity
                                    onPress={() => handleSuspend(selectedDriver)}
                                    className="bg-red-500 py-4 rounded-xl items-center"
                                >
                                    <Text className="text-white font-bold text-sm uppercase tracking-wide">Suspend Driver</Text>
                                </TouchableOpacity>
                            )}

                            {selectedDriver.status === 'suspended' && (
                                <TouchableOpacity
                                    onPress={() => handleReactivate(selectedDriver)}
                                    className="bg-teal-500 py-4 rounded-xl items-center"
                                >
                                    <Text className="text-white font-bold text-sm uppercase tracking-wide">Reactivate Driver</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                )}
            </Modal>
        </View>
    );
}
