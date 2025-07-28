import { Stack } from 'expo-router';

export default function DashboardLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="transfer"
                options={{
                    title: 'Transfer Funds',
                    headerShown: true,
                }}
            />
        </Stack>
    );
}