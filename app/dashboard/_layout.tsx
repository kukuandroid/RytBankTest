import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';

export default function DashboardLayout() {
    return (
        <Stack >
            <Stack.Screen
                name="contact-list"
                options={{
                    title: 'Contact List',
                    headerStyle: { backgroundColor: Colors.light.background },
                    headerTitleStyle: { color: "#fff" },
                }}
            />
            <Stack.Screen
                name="transfer"
                options={{
                    title: 'Transfer Funds',
                    headerStyle: { backgroundColor: Colors.light.background },
                    headerTitleStyle: { color: "#fff" },
                }}
            />
            <Stack.Screen
                name="transfer-amount"
                options={{
                    title: 'Transfer Amount',
                    headerStyle: { backgroundColor: Colors.light.background },
                    headerTitleStyle: { color: "#fff" },
                }}
            />

        </Stack>
    );
}