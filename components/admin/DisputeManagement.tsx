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

interface Dispute {
    id: string;
    title: string;
    type: 'refund' | 'complaint' | 'technical' | 'payment';
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    reportedBy: {
        name: string;
        type: 'driver' | 'provider';
        id: string;
    };
    description: string;
    amount?: number;
    location?: string;
    reportedDate: string;
    lastUpdated: string;
    assignedTo?: string;
    resolution?: string;
}

export default function DisputeManagement() {
    const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [resolutionNote, setResolutionNote] = useState('');

    // Mock dispute data
    const disputes: Dispute[] = [
        {
            id: 'D001',
            title: 'Refund Request - Incorrect Charge',
            type: 'refund',
            status: 'open',
            priority: 'high',
            reportedBy: {
                name: 'Arjun Mehta',
                type: 'driver',
                id: 'DR8472'
            },
            description: 'I was charged ₹150 for 2 hours of parking, but I only parked for 1 hour. The parking provider did not update the exit time correctly.',
            amount: 75,
            location: 'City Center Plaza',
            reportedDate: '10 mins ago',
            lastUpdated: '10 mins ago'
        },
        {
            id: 'D002',
            title: 'Slot Was Occupied - Booking Issue',
            type: 'complaint',
            status: 'in_progress',
            priority: 'urgent',
            reportedBy: {
                name: 'Priya Sharma',
                type: 'driver',
                id: 'DR5621'
            },
            description: 'Booked slot A-15 but when I arrived, the slot was already occupied. Provider was unresponsive to my calls.',
            location: 'Grand Mall Parking',
            reportedDate: '1 hour ago',
            lastUpdated: '30 mins ago',
            assignedTo: 'Admin Team Lead'
        },
        {
            id: 'D003',
            title: 'Payment Not Received',
            type: 'payment',
            status: 'open',
            priority: 'medium',
            reportedBy: {
                name: 'Rajesh Kumar (City Center Plaza)',
                type: 'provider',
                id: 'PV142'
            },
            description: 'Monthly settlement payment for January has not been credited to my account. Total amount pending: ₹24,500',
            amount: 24500,
            reportedDate: '2 hours ago',
            lastUpdated: '2 hours ago'
        },
        {
            id: 'D004',
            title: 'App Crashed During Payment',
            type: 'technical',
            status: 'in_progress',
            priority: 'medium',
            reportedBy: {
                name: 'Sneha Patel',
                type: 'driver',
                id: 'DR9034'
            },
            description: 'The app crashed right after I made the payment. Money was deducted but booking was not confirmed. Transaction ID: TXN123456789',
            amount: 100,
            location: 'Airport Premium Lot',
            reportedDate: '5 hours ago',
            lastUpdated: '3 hours ago',
            assignedTo: 'Tech Support'
        },
        {
            id: 'D005',
            title: 'Damaged Vehicle - Provider Negligence',
            type: 'complaint',
            status: 'resolved',
            priority: 'high',
            reportedBy: {
                name: 'Vikram Rao',
                type: 'driver',
                id: 'DR3421'
            },
            description: 'My vehicle was damaged while parked at Seaside Parking Hub. The provider denies responsibility despite CCTV footage showing their staff hit my car.',
            location: 'Seaside Parking Hub',
            reportedDate: '1 day ago',
            lastUpdated: '6 hours ago',
            assignedTo: 'Legal Team',
            resolution: 'Provider agreed to pay ₹5,000 for damages. Compensation initiated.'
        }
    ];

    const filteredDisputes = disputes.filter(dispute => {
        return filterStatus === 'all' || dispute.status === filterStatus;
    });

    const handleResolve = (dispute: Dispute) => {
        if (!resolutionNote.trim()) {
            Alert.alert('Error', 'Please enter a resolution note');
            return;
        }
        Alert.alert(
            'Resolve Dispute',
            `Mark dispute ${dispute.id} as resolved?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Resolve',
                    onPress: () => {
                        console.log('Resolved:', dispute.id, 'Note:', resolutionNote);
                        Alert.alert('Success', 'Dispute has been marked as resolved');
                        setResolutionNote('');
                        setShowDetailsModal(false);
                    }
                }
            ]
        );
    };

    const handleAssign = (dispute: Dispute) => {
        Alert.alert('Assign Dispute', `Assign dispute ${dispute.id} to a team member?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Admin Team', onPress: () => console.log('Assigned to Admin Team') },
            { text: 'Tech Support', onPress: () => console.log('Assigned to Tech Support') },
            { text: 'Legal Team', onPress: () => console.log('Assigned to Legal Team') }
        ]);
    };

    const handleEscalate = (dispute: Dispute) => {
        Alert.alert(
            'Escalate Dispute',
            `Escalate dispute ${dispute.id} to senior management?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Escalate',
                    style: 'destructive',
                    onPress: () => {
                        console.log('Escalated:', dispute.id);
                        Alert.alert('Escalated', 'Dispute has been escalated to senior management');
                    }
                }
            ]
        );
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-blue-50';
            case 'in_progress': return 'bg-yellow-50';
            case 'resolved': return 'bg-green-50';
            case 'closed': return 'bg-gray-50';
            default: return 'bg-gray-50';
        }
    };

    const getStatusTextColor = (status: string) => {
        switch (status) {
            case 'open': return 'text-blue-600';
            case 'in_progress': return 'text-yellow-600';
            case 'resolved': return 'text-green-600';
            case 'closed': return 'text-gray-600';
            default: return 'text-gray-600';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'refund': return 'cash-outline';
            case 'complaint': return 'warning-outline';
            case 'technical': return 'bug-outline';
            case 'payment': return 'card-outline';
            default: return 'help-outline';
        }
    };

    const renderDisputeCard = (dispute: Dispute, index: number) => (
        <Animated.View
            key={dispute.id}
            entering={FadeInDown.delay(index * 100).springify()}
        >
            <TouchableOpacity
                onPress={() => {
                    setSelectedDispute(dispute);
                    setShowDetailsModal(true);
                }}
                className="bg-white rounded-2xl p-4 mb-3 shadow-sm shadow-gray-200 border border-gray-100"
            >
                <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                        <View className="flex-row items-center gap-2 mb-2">
                            <View className={`w-1.5 h-6 rounded-full ${getPriorityColor(dispute.priority)}`} />
                            <View>
                                <Text className="text-dark-900 font-bold text-base">{dispute.title}</Text>
                                <Text className="text-gray-400 text-xs mt-0.5">#{dispute.id}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="flex-row gap-2 mb-3">
                    <View className={`px-3 py-1 rounded-full ${getStatusColor(dispute.status)}`}>
                        <Text className={`text-[10px] font-bold uppercase ${getStatusTextColor(dispute.status)}`}>
                            {dispute.status.replace('_', ' ')}
                        </Text>
                    </View>
                    <View className="bg-gray-50 px-3 py-1 rounded-full flex-row items-center">
                        <Ionicons name={getTypeIcon(dispute.type) as any} size={12} color="#636E72" />
                        <Text className="text-gray-600 text-[10px] font-bold uppercase ml-1">{dispute.type}</Text>
                    </View>
                </View>

                <View className="mb-3">
                    <Text className="text-gray-600 text-sm" numberOfLines={2}>
                        {dispute.description}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between border-t border-gray-100 pt-3">
                    <View>
                        <Text className="text-gray-400 text-[10px] font-bold uppercase">Reported By</Text>
                        <Text className="text-dark-900 text-xs font-bold mt-0.5">{dispute.reportedBy.name}</Text>
                        <Text className="text-gray-400 text-[10px]">{dispute.reportedBy.type.toUpperCase()} • ID: {dispute.reportedBy.id}</Text>
                    </View>
                    {dispute.amount && (
                        <View className="bg-red-50 px-3 py-1.5 rounded-xl">
                            <Text className="text-red-600 text-sm font-bold">₹{dispute.amount}</Text>
                        </View>
                    )}
                </View>

                <Text className="text-gray-300 text-[10px] mt-2">Reported: {dispute.reportedDate}</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-white px-6 pt-4 pb-4 border-b border-gray-100">
                <Text className="text-dark-900 font-bold text-2xl mb-4">Dispute Management</Text>

                {/* Stats Overview */}
                <View className="flex-row gap-3 mb-4">
                    <View className="flex-1 bg-blue-50 rounded-xl p-3">
                        <Text className="text-blue-600 text-2xl font-black">{disputes.filter(d => d.status === 'open').length}</Text>
                        <Text className="text-blue-700 text-[10px] font-bold uppercase mt-1">Open</Text>
                    </View>
                    <View className="flex-1 bg-yellow-50 rounded-xl p-3">
                        <Text className="text-yellow-600 text-2xl font-black">{disputes.filter(d => d.status === 'in_progress').length}</Text>
                        <Text className="text-yellow-700 text-[10px] font-bold uppercase mt-1">In Progress</Text>
                    </View>
                    <View className="flex-1 bg-green-50 rounded-xl p-3">
                        <Text className="text-green-600 text-2xl font-black">{disputes.filter(d => d.status === 'resolved').length}</Text>
                        <Text className="text-green-700 text-[10px] font-bold uppercase mt-1">Resolved</Text>
                    </View>
                </View>

                {/* Filter Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
                    {(['all', 'open', 'in_progress', 'resolved'] as const).map((status) => (
                        <TouchableOpacity
                            key={status}
                            onPress={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-xl ${filterStatus === status ? 'bg-orange-500' : 'bg-gray-100'}`}
                        >
                            <Text className={`text-xs font-bold uppercase ${filterStatus === status ? 'text-white' : 'text-gray-500'}`}>
                                {status.replace('_', ' ')}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Dispute List */}
            <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
                <Text className="text-gray-500 text-xs mb-4">
                    {filteredDisputes.length} dispute{filteredDisputes.length !== 1 ? 's' : ''} found
                </Text>
                {filteredDisputes.map((dispute, index) => renderDisputeCard(dispute, index))}
                <View className="h-20" />
            </ScrollView>

            {/* Details Modal */}
            <Modal
                visible={showDetailsModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowDetailsModal(false)}
            >
                {selectedDispute && (
                    <View className="flex-1 bg-gray-50">
                        {/* Modal Header */}
                        <View className="bg-orange-500 px-6 pt-16 pb-6">
                            <View className="flex-row justify-between items-center mb-3">
                                <View className="flex-1">
                                    <Text className="text-orange-100 text-xs font-bold uppercase tracking-wide">Dispute #{selectedDispute.id}</Text>
                                    <Text className="text-white text-xl font-black mt-1">{selectedDispute.title}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => setShowDetailsModal(false)}
                                    className="w-10 h-10 bg-white/20 rounded-full justify-center items-center"
                                >
                                    <Ionicons name="close" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View className="flex-row gap-2">
                                <View className={`px-3 py-1.5 rounded-full ${getStatusColor(selectedDispute.status)}`}>
                                    <Text className={`text-xs font-bold uppercase ${getStatusTextColor(selectedDispute.status)}`}>
                                        {selectedDispute.status.replace('_', ' ')}
                                    </Text>
                                </View>
                                <View className={`px-3 py-1.5 rounded-full ${getPriorityColor(selectedDispute.priority)}`}>
                                    <Text className="text-white text-xs font-bold uppercase">{selectedDispute.priority}</Text>
                                </View>
                            </View>
                        </View>

                        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
                            {/* Reported By */}
                            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-100">
                                <Text className="text-dark-900 font-bold text-lg mb-4">Reported By</Text>
                                <View className="gap-3">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">Name</Text>
                                        <Text className="text-dark-900 text-base font-bold">{selectedDispute.reportedBy.name}</Text>
                                    </View>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">User Type</Text>
                                        <Text className="text-dark-900 text-base font-bold capitalize">{selectedDispute.reportedBy.type}</Text>
                                    </View>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">User ID</Text>
                                        <Text className="text-dark-900 text-base font-bold">{selectedDispute.reportedBy.id}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Dispute Details */}
                            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-100">
                                <Text className="text-dark-900 font-bold text-lg mb-4">Dispute Details</Text>
                                <View className="gap-3">
                                    <View>
                                        <Text className="text-gray-500 text-xs font-bold uppercase mb-2">Description</Text>
                                        <Text className="text-gray-700 text-sm leading-5">{selectedDispute.description}</Text>
                                    </View>
                                    {selectedDispute.location && (
                                        <View className="flex-row justify-between items-center mt-2">
                                            <Text className="text-gray-500 text-sm">Location</Text>
                                            <Text className="text-dark-900 text-base font-bold">{selectedDispute.location}</Text>
                                        </View>
                                    )}
                                    {selectedDispute.amount && (
                                        <View className="flex-row justify-between items-center">
                                            <Text className="text-gray-500 text-sm">Amount</Text>
                                            <Text className="text-red-600 text-lg font-bold">₹{selectedDispute.amount}</Text>
                                        </View>
                                    )}
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">Type</Text>
                                        <View className="flex-row items-center">
                                            <Ionicons name={getTypeIcon(selectedDispute.type) as any} size={16} color="#636E72" />
                                            <Text className="text-dark-900 text-sm font-bold ml-2 capitalize">{selectedDispute.type}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* Timeline */}
                            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-100">
                                <Text className="text-dark-900 font-bold text-lg mb-4">Timeline</Text>
                                <View className="gap-3">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">Reported Date</Text>
                                        <Text className="text-gray-700 text-sm font-bold">{selectedDispute.reportedDate}</Text>
                                    </View>
                                    <View className="flex-row justify-between items-center">
                                        <Text className="text-gray-500 text-sm">Last Updated</Text>
                                        <Text className="text-gray-700 text-sm font-bold">{selectedDispute.lastUpdated}</Text>
                                    </View>
                                    {selectedDispute.assignedTo && (
                                        <View className="flex-row justify-between items-center">
                                            <Text className="text-gray-500 text-sm">Assigned To</Text>
                                            <Text className="text-indigo-600 text-sm font-bold">{selectedDispute.assignedTo}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>

                            {/* Resolution (if resolved) */}
                            {selectedDispute.resolution && (
                                <View className="bg-green-50 rounded-2xl p-5 mb-4 border border-green-200">
                                    <View className="flex-row items-center mb-3">
                                        <Ionicons name="checkmark-circle" size={24} color="#00B894" />
                                        <Text className="text-green-700 font-bold text-lg ml-2">Resolution</Text>
                                    </View>
                                    <Text className="text-green-800 text-sm leading-5">{selectedDispute.resolution}</Text>
                                </View>
                            )}

                            {/* Resolution Input (if not resolved) */}
                            {selectedDispute.status !== 'resolved' && (
                                <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-100">
                                    <Text className="text-dark-900 font-bold text-lg mb-3">Add Resolution Note</Text>
                                    <TextInput
                                        placeholder="Enter resolution details..."
                                        value={resolutionNote}
                                        onChangeText={setResolutionNote}
                                        multiline
                                        numberOfLines={4}
                                        className="bg-gray-50 rounded-xl p-4 text-dark-900 text-sm"
                                        placeholderTextColor="#B2BEC3"
                                        textAlignVertical="top"
                                    />
                                </View>
                            )}

                            <View className="h-100" />
                        </ScrollView>

                        {/* Action Buttons */}
                        {selectedDispute.status !== 'resolved' && (
                            <View className="bg-white px-6 py-4 border-t border-gray-100 gap-3">
                                <TouchableOpacity
                                    onPress={() => handleResolve(selectedDispute)}
                                    className="bg-green-500 py-4 rounded-xl items-center flex-row justify-center"
                                >
                                    <Ionicons name="checkmark-circle" size={20} color="white" />
                                    <Text className="text-white font-bold text-sm uppercase tracking-wide ml-2">Mark as Resolved</Text>
                                </TouchableOpacity>

                                <View className="flex-row gap-3">
                                    <TouchableOpacity
                                        onPress={() => handleAssign(selectedDispute)}
                                        className="flex-1 bg-blue-500 py-3 rounded-xl items-center"
                                    >
                                        <Text className="text-white font-bold text-xs uppercase tracking-wide">Assign</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleEscalate(selectedDispute)}
                                        className="flex-1 bg-red-500 py-3 rounded-xl items-center"
                                    >
                                        <Text className="text-white font-bold text-xs uppercase tracking-wide">Escalate</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                )}
            </Modal>
        </View>
    );
}
