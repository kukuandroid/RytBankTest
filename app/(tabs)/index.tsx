
import InfoCard from '@/components/ui/InfoCard';
import { actions } from '@/constants/Actions';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BankDashboard = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [balance, setBalance] = useState<string | null>(null);
    const [loadingBalance, setLoadingBalance] = useState(false);

    useEffect(() => {
        // const fetchBalance = async () => {
        //     setLoadingBalance(true);
        //     try {
        //         const res = await apiFetch(`/account-balance?userId=${122}`);
        //         setBalance(res.balance);
        //     } catch (err) {
        //         setBalance(null);
        //     } finally {
        //         setLoadingBalance(false);
        //     }
        // };
        // fetchBalance();
    }, [213]);

    const topReads = [
        { title: 'How to Save Money', subtitle: 'Tips for better savings', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
        { title: 'Smart Investments', subtitle: 'Grow your wealth', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
        { title: 'Credit Card Guide', subtitle: 'Maximize your benefits', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
        { title: 'Budget Planning', subtitle: 'Track your expenses', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    ];
    const promos = [
        { title: 'Promo 1', subtitle: 'every non-cash transactions', image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
        { title: 'Promo 2', subtitle: 'giving activity this month', image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
    ];

    const handleAction = (key: string) => {
        switch (key) {
            case 'transfer':
                // Handle transfer action
                // router.navigate('/home/Transfer');
                break;

            default:
                break;
        }
    }

    // Set tab bar height to match your floating tab bar style
    const TAB_BAR_HEIGHT = 64 + 24 + 80; // height + bottom + top margin
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT }}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.bankName}>
                    <Text style={styles.boldText}>Ryt</Text>Bank
                </Text>
                <View style={styles.rightIcons}>
                    <View style={styles.notification}>
                        <MaterialIcons name='notifications' size={20} color="#fff" />
                        <View style={styles.badge}><Text style={styles.badgeText}>5</Text></View>
                    </View>
                    <TouchableOpacity onPress={() => {}}>
                        <Image
                            source={{ uri: 'https://cdn2.iconfinder.com/data/icons/avatars-60/5985/24-Maid-128.png' }}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Greeting */}
            <Text style={styles.greeting}>Good Evening</Text>
            <Text style={styles.username}>{'name'}</Text>

            {/* Account Balance Card */}
            <View style={styles.balanceCard}>
                <View style={styles.balanceTop}>
                    <Text style={styles.balanceTitle}>Account Balance</Text>
                </View>
                <View style={styles.balanceValueRow}>
                    <Text style={styles.balanceAmount}>
                        {showBalance ? (loadingBalance ? 'Loading...' : balance ? `RM ${balance}` : 'N/A') : '••••••'}
                    </Text>
                    <TouchableOpacity onPress={() => setShowBalance((prev) => !prev)}>
                        <MaterialIcons
                            name={showBalance ? 'remove-red-eye' : 'visibility-off'}
                            size={20}
                            color="#fff"
                            style={styles.showPassword}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.actionRow}>
                    {actions.map((action, index) => (
                        <TouchableOpacity key={index} style={styles.actionButton} onPress={() => handleAction(action.key)}>
                            <MaterialIcons name={action.icon} size={20} color="#fff" />
                            <Text style={styles.actionLabel}>{action.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Promos & Reminders */}
            <Text style={styles.sectionTitle}>Promos & Reminders</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.infoCardsScroll} contentContainerStyle={{ paddingRight: 8 }}>
                {promos.map((item, idx) => (
                    <InfoCard image={item.image} title={item.title} subtitle={item.subtitle} key={item.title} />
                ))}
            </ScrollView>

            {/* Top Reads Section */}
            <Text style={styles.sectionTitle}>Top Reads</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.infoCardsScroll} contentContainerStyle={{ paddingRight: 8 }}>
                {topReads.map((item, idx) => (
                    <InfoCard image={item.image} title={item.title} subtitle={item.subtitle} key={item.title} />
                ))}
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    infoCardsScroll: {
        marginBottom: 24,
    },
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    showPassword: {
        marginLeft: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bankName: {
        fontSize: 22,
        color: '#fff',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#0101e5',
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notification: {
        marginRight: 15,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -6,
        right: -8,
        backgroundColor: '#FACC15',
        borderRadius: 10,
        paddingHorizontal: 4,
    },
    badgeText: {
        fontSize: 10,
        color: '#000',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ddd',
    },
    greeting: {
        color: '#CBD5E1',
        marginTop: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    balanceCard: {
        backgroundColor: '#0101e5',
        borderRadius: 32,
        padding: 20,
        marginBottom: 20,
    },
    balanceTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    balanceTitle: {
        color: '#fff',
        fontSize: 14,
    },
    balanceValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    balanceAmount: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionButton: {
        alignItems: 'center',
        flex: 1,
    },
    actionLabel: {
        marginTop: 6,
        fontSize: 12,
        color: '#fff',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 10,
    },
    promosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    promoCard: {
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 12,
        width: '48%',
    },
    promoAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0F172A',
        marginBottom: 4,
    },
    promoText: {
        fontSize: 12,
        color: '#475569',
    },
    activityPlaceholder: {
        backgroundColor: '#F1F5F9',
        padding: 20,
        borderRadius: 12,
        marginBottom: 40,
        alignItems: 'center',
    },
    activityText: {
        color: '#64748B',
    },
});

export default BankDashboard;