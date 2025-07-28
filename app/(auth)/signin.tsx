import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const { height } = Dimensions.get('window');

const SignInScreen: React.FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            if (!username.trim() || !password.trim()) {
                Alert.alert('Error', 'Please enter both email and password');
                return;
            }
            setIsLoading(true);
            try {
                await login(username, password);
            } catch (error) {
                Alert.alert('Login Failed', error instanceof Error ? error.message : 'Please try again');
            } finally {
                setIsLoading(false);
            }
        } catch (error: any) {
            Alert.alert("Login Failed", error.message || "An unexpected error occurred.");
        }
    };


    const [showPassword, setShowPassword] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                        {/* Top Yellow Section */}
                        <View style={styles.topSection}>
                            <Text style={styles.helloText}>Hello</Text>
                            <Text style={styles.welcomeBackText}>Welcome Back!</Text>
                        </View>

                        {/* Login Card */}
                        <View style={styles.loginCard}>
                            <Text style={styles.loginAccountTitle}>Login Account</Text>
                            <Text style={styles.loginDescription}>
                                Lorem ipsum dolor sit amet, consectetuer adipiscing sed diam nonummy nibh euismod tincidunt
                            </Text>

                            {/* Email Address Input */}
                            <Text style={styles.inputLabel}>Username</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Your Username"
                                    keyboardType="default"
                                    onChangeText={setUsername}
                                />
                            </View>

                            {/* Password Input */}
                            <Text style={styles.inputLabel}>Password</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="********"
                                    secureTextEntry={!showPassword}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
                                    <MaterialIcons
                                        name={showPassword ? 'visibility-off' : 'remove-red-eye'}
                                        size={24}
                                        color="#888"
                                        style={styles.inputIcon}
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Save Password & Forgot Password */}
                            <View style={styles.optionsContainer}>
                                <TouchableOpacity onPress={() => alert("Disabled in demo mode")}>
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Login Account Button */}
                            {isLoading ? (
                                <ActivityIndicator color="white" />
                            ) : <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                                <Text style={styles.loginButtonText}>Login Account</Text>
                            </TouchableOpacity>}

                            {/* Create New Account */}
                            <TouchableOpacity style={styles.createAccountButton} onPress={() => alert("Disabled in demo demo")}>
                                <Text style={styles.createAccountText}>Create New Account</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background, // A warm yellow color
    },
    topSection: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: height * 0.08, // Adjust as needed
    },
    helloText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    welcomeBackText: {
        fontSize: 24,
        color: '#fff',
    },
    loginCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
        paddingTop: 30,
        alignItems: 'center', // Center content horizontally
    },
    loginAccountTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    loginDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 15,
    },
    inputLabel: {
        alignSelf: 'flex-start',
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        marginTop: 15,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        width: '100%', // Take full width of the card
        height: 50,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    inputIcon: {
        marginLeft: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxIcon: {
        marginRight: 5,
    },
    savePasswordText: {
        fontSize: 14,
        color: '#666',
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#0101e5',
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#0101e5',
        paddingVertical: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    createAccountButton: {
        marginTop: 10,
    },
    createAccountText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
});

export default SignInScreen;