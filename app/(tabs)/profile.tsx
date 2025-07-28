import ActionButton from '@/components/ui/ActionButton';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
type MaterialCommunityIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

const ProfileScreen: React.FC = () => {

    const { user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: logout }
            ]
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.curveContainer}>
                <Svg height="180" width="100%" viewBox="0 0 400 180" style={styles.curveSvg}>
                    <Path
                        d="M0,0 Q200,80 400,0 L400,180 L0,180 Z"
                        fill="#E6EFEA"
                    />
                </Svg>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={styles.profilePicWrapper}>
                    <View style={styles.profilePicContainer}>
                        <Image
                            source={{ uri: 'https://cdn2.iconfinder.com/data/icons/avatars-60/5985/24-Maid-256.png' }}
                            style={styles.profilePic}
                        />
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* User Name and Role */}
                <Text style={styles.userName}>{user?.name ?? "N/A"}</Text>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    <ProfileMenuItem
                        iconName="face-man-profile"
                        title="Edit Profile"
                        onPress={() => console.log('Edit Profile pressed')}
                    />
                    <ProfileMenuItem
                        iconName="onepassword"
                        title="Change Password"
                        onPress={() => console.log('Change Password pressed')}
                    />
                </View>

                {/* Sign Out Button */}
                <ActionButton onPress={() => handleLogout()} iconStyle={styles.signOutIcon} />
            </ScrollView>
        </SafeAreaView>
    );
};

// Reusable component for menu items


interface ProfileMenuItemProps {
    iconName: MaterialCommunityIconName;
    title: string;
    onPress: () => void;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ iconName, title, onPress }) => {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuItemIconBackground}>
                <MaterialCommunityIcons name={iconName} size={24} color={Colors.light.subColor} />
            </View>
            <Text style={styles.menuItemText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    curveContainer: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: -60,
    },
    curveSvg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 0,
    },
    profilePicWrapper: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,
    },
    scrollContent: {
        paddingTop: 80,
        paddingBottom: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    profilePicContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        marginBottom: 15,
        position: 'relative',
        borderWidth: 2,
        borderColor: '#C0C0C0', // Light border as seen in the image
    },
    profilePic: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    editProfilePicButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#52796F', // Greenish color
        borderRadius: 15,
        padding: 8,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    userRole: {
        fontSize: 16,
        color: '#888',
        marginBottom: 40,
    },
    menuContainer: {
        width: '90%',
        marginBottom: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuItemIconBackground: {
        backgroundColor: '#E6EFEA', // Light greenish background for icons
        borderRadius: 10,
        padding: 8,
        marginRight: 15,
    },
    menuItemText: {
        flex: 1,
        fontSize: 18,
        color: '#333',
    },
    signOutIcon: {
        marginRight: 10,
    },
    signOutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;