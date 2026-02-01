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

interface Provider {
    id: string;
    name: string;
    ownerName: string;
    email: string;
    phone: string;
    location: string;
    address: string;
    slots: number;
    evChargers: number;
    pricePerHour: number;
    status: 'pending' | 'approved' | 'rejected' | 'suspended';
    appliedDate: string;
    documents: {
        businessLicense: boolean;
        taxId: boolean;
        propertyProof: boolean;
    };
    rating?: number;
    totalBookings?: number;
    revenue?: number;
}

export default function ProviderManagement() {
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Dynamic state for providers
    const [providers, setProviders] = useState<Provider[]>([
        {
            id: '1',
            name: 'City Center Plaza',
            ownerName: 'Rajesh Kumar',
            email: 'rajesh@cityplaza.com',
            phone: '+91 98765 43210',
            location: 'Downtown District',
            address: '123 Main Street, Sector 15, New Delhi',
            slots: 150,
            evChargers: 10,
            pricePerHour: 50,
            status: 'pending',
            appliedDate: '2 hrs ago',
            documents: {
                businessLicense: true,
                taxId: true,
                propertyProof: true
            }
        },
        {
            id: '2',
            name: 'Grand Mall Parking',
            ownerName: 'Priya Sharma',
            email: 'priya@grandmall.com',
            phone: '+91 98765 43211',
            location: 'Shopping Complex',
            address: '456 Mall Road, Sector 22, Mumbai',
            slots: 200,
            evChargers: 15,
            pricePerHour: 40,
            status: 'approved',
            appliedDate: '2 days ago',
            documents: {
                businessLicense: true,
                taxId: true,
                propertyProof: true
            },
            rating: 4.7,
            totalBookings: 1256,
            revenue: 245000
        },
        {
            id: '3',
            name: 'Airport Premium Lot',
            ownerName: 'Amit Patel',
            email: 'amit@airportparking.com',
            phone: '+91 98765 43212',
            location: 'Terminal 3',
            address: 'Airport Road, Terminal 3, Bangalore',
            slots: 300,
            evChargers: 25,
            pricePerHour: 100,
            status: 'pending',
            appliedDate: '1 day ago',
            documents: {
                businessLicense: true,
                taxId: false,
                propertyProof: true
            }
        },
        {
            id: '4',
            name: 'Seaside Parking Hub',
            ownerName: 'Neha Gupta',
            email: 'neha@seasideparking.com',
            phone: '+91 98765 43213',
            location: 'Coastal Road',
            address: '789 Beach Road, Marine Drive, Mumbai',
            slots: 120,
            evChargers: 8,
            pricePerHour: 60,
            status: 'approved',
            appliedDate: '5 days ago',
            documents: {
                businessLicense: true,
                taxId: true,
                propertyProof: true
            },
            rating: 4.5,
            totalBookings: 890,
            revenue: 178000
        },
        {
            id: '5',
            name: 'Tech Park Parking',
            ownerName: 'Suresh Reddy',
            email: 'suresh@techpark.com',
            phone: '+91 98765 43214',
            location: 'IT District',
            address: '321 Tech Boulevard, Hyderabad',
            slots: 180,
            evChargers: 20,
            pricePerHour: 45,
            status: 'suspended',
            appliedDate: '10 days ago',
            documents: {
                businessLicense: true,
                taxId: true,
                propertyProof: false
            },
            rating: 3.8,
            totalBookings: 456,
            revenue: 95000
        }
    ]);

    const filteredProviders = providers.filter(provider => {
        const matchesStatus = filterStatus === 'all' || provider.status === filterStatus;
        const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            provider.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            provider.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleApprove = (provider: Provider) => {
        Alert.alert('Approve Provider', `Are you sure you want to approve ${provider.name}?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Approve',
                onPress: () => {
                    setProviders(prev => prev.map(p => p.id === provider.id ? { ...p, status: 'approved' } : p));
                    Alert.alert('Approved', `${provider.name} has been approved.`);
                    setShowDetailsModal(false);
                }
            }
        ]);
    };

    const handleReject = (provider: Provider) => {
        Alert.alert('Reject Provider', `Are you sure you want to reject ${provider.name}?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Reject',
                style: 'destructive',
                onPress: () => {
                    setProviders(prev => prev.map(p => p.id === provider.id ? { ...p, status: 'rejected' } : p));
                    Alert.alert('Rejected', `${provider.name} application has been declined.`);
                    setShowDetailsModal(false);
                }
            }
        ]);
    };

    const handleSuspend = (provider: Provider) => {
        Alert.alert('Suspend Provider', `Are you sure you want to suspend ${provider.name}?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Suspend',
                style: 'destructive',
                onPress: () => {
                    setProviders(prev => prev.map(p => p.id === provider.id ? { ...p, status: 'suspended' } : p));
                    Alert.alert('Suspended', `${provider.name} has been suspended.`);
                    setShowDetailsModal(false);
                }
            }
        ]);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-50';
            case 'pending': return 'bg-yellow-50';
            case 'rejected': return 'bg-red-50';
            case 'suspended': return 'bg-orange-50';
            default: return 'bg-gray-50';
        }
    };

    const getStatusTextColor = (status: string) => {
        switch (status) {
            case 'approved': return 'text-green-600';
            case 'pending': return 'text-yellow-600';
            case 'rejected': return 'text-red-600';
            case 'suspended': return 'text-orange-600';
            default: return 'text-gray-600';
        }
    };

    const renderProviderCard = (provider: Provider, index: number) => (
        <Animated.View
            key={provider.id}
            entering={FadeInDown.delay(index * 100).springify()}
        >
            <TouchableOpacity
                onPress={() => {
                    setSelectedProvider(provider);
                    setShowDetailsModal(true);
                }}
                className="bg-white rounded-2xl p-4 mb-3 shadow-sm shadow-gray-200 border border-gray-100"
            >
                <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                        <Text className="text-dark-900 font-bold text-base">{provider.name}</Text>
                        <Text className="text-gray-500 text-sm mt-1">{provider.ownerName}</Text>
                        <View className="flex-row items-center gap-1 mt-1">
                            <Ionicons name="location" size={12} color="#636E72" />
                            <Text className="text-gray-400 text-xs">{provider.location}</Text>
                        </View>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${getStatusColor(provider.status)}`}>
                        <Text className={`text-[10px] font-bold uppercase ${getStatusTextColor(provider.status)}`}>
                            {provider.status}
                        </Text>
                    </View>
                </View>

                <View className="flex-row gap-2 mb-3">
                    <View className="bg-indigo-50 px-2 py-1 rounded-lg flex-row items-center">
                        <Ionicons name="car" size={12} color="#6C5CE7" />
                        <Text className="text-indigo-600 text-[10px] font-bold ml-1">{provider.slots} slots</Text>
                    </View>
                    <View className="bg-teal-50 px-2 py-1 rounded-lg flex-row items-center">
                        <Ionicons name="flash" size={12} color="#00B894" />
                        <Text className="text-teal-600 text-[10px] font-bold ml-1">{provider.evChargers} EV</Text>
                    </View>
                    <View className="bg-blue-50 px-2 py-1 rounded-lg">
                        <Text className="text-blue-600 text-[10px] font-bold">₹{provider.pricePerHour}/hr</Text>
                    </View>
                </View>

                {provider.status === 'approved' && provider.rating && (
                    <View className="flex-row items-center justify-between border-t border-gray-100 pt-3">
                        <View className="flex-row items-center gap-1">
                            <Ionicons name="star" size={14} color="#FDCB6E" />
                            <Text className="text-dark-900 text-sm font-bold">{provider.rating}</Text>
                        </View>
                        <Text className="text-gray-400 text-xs">{provider.totalBookings} bookings</Text>
                        <Text className="text-teal-600 text-sm font-bold">₹{(provider.revenue! / 1000).toFixed(1)}K</Text>
                    </View>
                )}

                <Text className="text-gray-300 text-[10px] mt-2">{provider.appliedDate}</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-white px-6 pt-4 pb-4 border-b border-gray-100">
                <Text className="text-dark-900 font-bold text-2xl mb-4">Provider Management</Text>

                {/* Search Bar */}
                <View className="bg-gray-50 rounded-2xl px-4 py-3 flex-row items-center mb-4">
                    <Ionicons name="search" size={20} color="#636E72" />
                    <TextInput
                        placeholder="Search providers..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        className="flex-1 ml-2 text-dark-900"
                        placeholderTextColor="#B2BEC3"
                    />
                </View>

                {/* Filter Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
                    {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                        <TouchableOpacity
                            key={status}
                            onPress={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-xl ${filterStatus === status ? 'bg-slate-600' : 'bg-gray-100'}`}
                        >
                            <Text className={`text-xs font-bold uppercase ${filterStatus === status ? 'text-white' : 'text-gray-500'}`}>
                                {status}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Provider List */}
            <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
                <Text className="text-gray-500 text-xs mb-4">
                    {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} found
                </Text>
                {filteredProviders.map((provider, index) => renderProviderCard(provider, index))}
                <View className="h-20" />
            </ScrollView>

            {/* Details Modal */}
            <Modal
                visible={showDetailsModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowDetailsModal(false)}
            >
                {selectedProvider && (
                    <View className="flex-1 bg-gray-50">
                        {/* Modal Header */}
                        <View className="bg-slate-600 px-6 pt-16 pb-6">
                            <View className="flex-row justify-between items-center">
                                <View className="flex-1">
                                    <Text className="text-white text-2xl font-black">{selectedProvider.name}</Text>
                                    <Text className="text-gray-300 text-sm mt-1">{selectedProvider.ownerName}</Text>
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
                            <View className={`self-start px-4 py-2 rounded-full ${getStatusColor(selectedProvider.status)} mb-6`}>
                                <Text className={`text-sm font-bold uppercase ${getStatusTextColor(selectedProvider.status)}`}>
                                    {selectedProvider.status}
                                </Text>
                            </View>

                            {/* Contact Information */}
                            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-100">
                                <Text className="text-dark-900 font-bold text-lg mb-4">Contact Information</Text>
                                <View className="gap-3">
                                    <View className="flex-row items-center">
                                        <Ionicons name="mail" size={20} color="#636E72" />
                                        <Text className="text-gray-600 text-sm ml-3">{selectedProvider.email}</Text>
                                    </View>
                                    <View className="flex-row items-center">
                                        <Ionicons name="call" size={20} color="#636E72" />
                                        <Text className="text-gray-600 text-sm ml-3">{selectedProvider.phone}</Text>
                                    </View>
                                    <View className="flex-row items-start">
                                        <Ionicons name="location" size={20} color="#636E72" />
                                        <Text className="text-gray-600 text-sm ml-3 flex-1">{selectedProvider.address}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Parking Details */}
                            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-100">
                                <Text className="text-dark-900 font-bold text-lg mb-4">Parking Details</Text>
                                <View className="gap-3">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">Total Slots</Text>
                                        <Text className="text-dark-900 text-base font-bold">{selectedProvider.slots}</Text>
                                    </View>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">EV Chargers</Text>
                                        <Text className="text-dark-900 text-base font-bold">{selectedProvider.evChargers}</Text>
                                    </View>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">Price per Hour</Text>
                                        <Text className="text-teal-600 text-base font-bold">₹{selectedProvider.pricePerHour}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Documents */}
                            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-100">
                                <Text className="text-dark-900 font-bold text-lg mb-4">Documents</Text>
                                <View className="gap-3">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-600 text-sm">Business License</Text>
                                        <Ionicons
                                            name={selectedProvider.documents.businessLicense ? 'checkmark-circle' : 'close-circle'}
                                            size={24}
                                            color={selectedProvider.documents.businessLicense ? '#00B894' : '#FF7675'}
                                        />
                                    </View>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-600 text-sm">Tax ID</Text>
                                        <Ionicons
                                            name={selectedProvider.documents.taxId ? 'checkmark-circle' : 'close-circle'}
                                            size={24}
                                            color={selectedProvider.documents.taxId ? '#00B894' : '#FF7675'}
                                        />
                                    </View>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-600 text-sm">Property Proof</Text>
                                        <Ionicons
                                            name={selectedProvider.documents.propertyProof ? 'checkmark-circle' : 'close-circle'}
                                            size={24}
                                            color={selectedProvider.documents.propertyProof ? '#00B894' : '#FF7675'}
                                        />
                                    </View>
                                </View>
                            </View>

                            {/* Performance (if approved) */}
                            {selectedProvider.status === 'approved' && selectedProvider.rating && (
                                <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-100">
                                    <Text className="text-dark-900 font-bold text-lg mb-4">Performance</Text>
                                    <View className="gap-3">
                                        <View className="flex-row justify-between items-center">
                                            <Text className="text-gray-500 text-sm">Rating</Text>
                                            <View className="flex-row items-center">
                                                <Ionicons name="star" size={18} color="#FDCB6E" />
                                                <Text className="text-dark-900 text-base font-bold ml-1">{selectedProvider.rating}</Text>
                                            </View>
                                        </View>
                                        <View className="flex-row justify-between items-center">
                                            <Text className="text-gray-500 text-sm">Total Bookings</Text>
                                            <Text className="text-dark-900 text-base font-bold">{selectedProvider.totalBookings}</Text>
                                        </View>
                                        <View className="flex-row justify-between items-center">
                                            <Text className="text-gray-500 text-sm">Revenue Generated</Text>
                                            <Text className="text-teal-600 text-base font-bold">₹{(selectedProvider.revenue! / 1000).toFixed(1)}K</Text>
                                        </View>
                                    </View>
                                </View>
                            )}

                            <View className="h-100" />
                        </ScrollView>

                        {/* Action Buttons */}
                        <View className="bg-white px-6 py-4 border-t border-gray-100">
                            {selectedProvider.status === 'pending' && (
                                <View className="flex-row gap-3">
                                    <TouchableOpacity
                                        onPress={() => handleApprove(selectedProvider)}
                                        className="flex-1 bg-teal-500 py-4 rounded-xl items-center"
                                    >
                                        <Text className="text-white font-bold text-sm uppercase tracking-wide">Approve</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleReject(selectedProvider)}
                                        className="flex-1 bg-red-500 py-4 rounded-xl items-center"
                                    >
                                        <Text className="text-white font-bold text-sm uppercase tracking-wide">Reject</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {selectedProvider.status === 'approved' && (
                                <TouchableOpacity
                                    onPress={() => handleSuspend(selectedProvider)}
                                    className="bg-orange-500 py-4 rounded-xl items-center"
                                >
                                    <Text className="text-white font-bold text-sm uppercase tracking-wide">Suspend Provider</Text>
                                </TouchableOpacity>
                            )}
                            {selectedProvider.status === 'suspended' && (
                                <TouchableOpacity
                                    onPress={() => handleApprove(selectedProvider)}
                                    className="bg-teal-500 py-4 rounded-xl items-center"
                                >
                                    <Text className="text-white font-bold text-sm uppercase tracking-wide">Reactivate Provider</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                )}
            </Modal>
        </View>
    );
}
