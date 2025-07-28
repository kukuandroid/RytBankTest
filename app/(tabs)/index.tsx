
import InfoCard from '@/components/ui/InfoCard';
import { ToastBar, showToast } from '@/components/ui/ToastBar';
import { actions } from '@/constants/Actions';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getApi } from "../../utils/api";

const BankDashboard = () => {
    // Dummy last transactions
    const lastTransactions = [
        {
            id: '1',
            name: 'Fatimah Binti Ali',
            amount: '-RM 120.00',
            date: '2025-07-28',
            type: 'Transfer',
        },
        {
            id: '2',
            name: 'Ahmad Bin Salleh',
            amount: '+RM 500.00',
            date: '2025-07-27',
            type: 'Received',
        },
        {
            id: '3',
            name: 'Siti Nurhaliza',
            amount: '-RM 50.00',
            date: '2025-07-26',
            type: 'Transfer',
        },
    ];
    const [showBalance, setShowBalance] = useState(true);
    const [balance, setBalance] = useState<string | null>(null);
    const [loadingBalance, setLoadingBalance] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchBalance = async () => {
            setLoadingBalance(true);
            try {
                const res = await getApi<{ balance: string }>('/account-balance');
                setBalance(res.balance);
                showToast({
                    type: 'success',
                    text1: 'Balance Updated',
                    text2: `Your balance is RM ${res.balance}`,
                });
            } catch (err) {
                setBalance(null);
                showToast({
                    type: 'error',
                    text1: 'Failed to update balance',
                    text2: 'Please try again later.',
                });
            } finally {
                setLoadingBalance(false);
            }
        };
        fetchBalance();
    }, [balance]);

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
                router.push('/dashboard/contact-list');
                break;

            default:
                showToast({
                    type: 'info',
                    text1: 'Undergo Maintenance',
                    text2: `Please try again later.`,
                });
                break;
        }
    }

    // Set tab bar height to match your floating tab bar style
    const TAB_BAR_HEIGHT = 64 + 24 + 80; // height + bottom + top margin
    // Get screen height for dynamic curve
    const screenHeight = Dimensions.get('window').height; // You can use Dimensions.get('window').height for real device
    const curveHeight = screenHeight / 2.5;

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={[styles.curvyHeaderBg, { height: curveHeight }]} />
                <ScrollView style={[styles.container, { marginTop: curveHeight / 10 }]} contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT }}>
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
                            <TouchableOpacity onPress={() => { }}>
                                <Image
                                    source={{ uri: 'https://cdn2.iconfinder.com/data/icons/avatars-60/5985/24-Maid-128.png' }}
                                    style={styles.avatar}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Greeting */}
                    <Text style={styles.greeting}>Welcome Back</Text>
                    <Text style={styles.username}>{user?.name ?? 'N/A'}</Text>

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

                    {/* Last Transactions */}
                    <View style={styles.transactionHeaderRow}>
                        <Text style={styles.sectionTitle}>Last Transactions</Text>
                        <TouchableOpacity style={styles.viewAllBtn} onPress={() => showToast({ type: 'info', text1: 'Coming Soon', text2: 'View all transactions feature coming soon.' })}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.transactionList}>
                        {lastTransactions.map(tx => (
                            <View key={tx.id} style={styles.transactionTile}>
                                <View style={styles.transactionLeft}>
                                    <View style={styles.transactionAvatar}>
                                        <Text style={styles.transactionAvatarText}>{tx.name.split(' ').map(w => w[0]).join('').toUpperCase()}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.transactionName}>{tx.name}</Text>
                                        <Text style={styles.transactionType}>{tx.type}</Text>
                                    </View>
                                </View>
                                <View style={styles.transactionRight}>
                                    <Text style={[styles.transactionAmount, tx.amount.startsWith('-') ? styles.amountOut : styles.amountIn]}>{tx.amount}</Text>
                                    <Text style={styles.transactionDate}>{tx.date}</Text>
                                </View>
                            </View>
                        ))}
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
            </View>
            <ToastBar />
        </>
    );
};

const styles = StyleSheet.create({
    transactionHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    viewAllBtn: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 8,
        backgroundColor: '#F1F5F9',
    },
    viewAllText: {
        fontSize: 12,
        color: '#0F172A',
        fontWeight: '600',
    },
    transactionList: {
        marginBottom: 24,
    },
    transactionTile: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
        justifyContent: 'space-between',
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    transactionAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#e2e8f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    transactionAvatarText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    transactionName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0F172A',
    },
    transactionType: {
        fontSize: 12,
        color: '#64748B',
    },
    transactionRight: {
        alignItems: 'flex-end',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    amountOut: {
        color: '#EF4444',
    },
    amountIn: {
        color: '#22C55E',
    },
    transactionDate: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 2,
    },
    infoCardsScroll: {
        marginBottom: 24,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    curvyHeaderBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0F172A',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        zIndex: 0,
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
        color: Colors.light.primaryColor,
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
        backgroundColor: Colors.light.primaryColor,
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
        color: '#000',
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