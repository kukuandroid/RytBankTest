import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';

export default function DashboardLayout() {
    return (
        <Stack screenOptions={
            {
                headerStyle: { backgroundColor: Colors.light.background },
                headerTitleStyle: { color: "#fff" },
                headerTintColor: "#fff",
            }
        } >
            <Stack.Screen
                name="contact-list"
                options={{
                    title: 'Contact List',
                }}
            />
            <Stack.Screen
                name="transfer"
                options={{
                    title: 'Transfer Funds',
                }}
            />
            <Stack.Screen
                name="transfer-amount"
                options={{
                    title: 'Transfer Amount',
                }}
            />
            <Stack.Screen
                name="transfer-acknowledment"
                options={{
                    title: 'Acknowledgment',
                }}
            />

        </Stack>
    );
}