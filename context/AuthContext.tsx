// app/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { postApi } from '../utils/api';
import { User, clearAuthData, getToken, getUser, saveToken, saveUser } from '../utils/storage';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('usreAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing auth data on app start
    useEffect(() => {
        checkAuthState();
    }, []);

    const checkAuthState = async () => {
        try {
            const [token, savedUser] = await Promise.all([getToken(), getUser()]);

            if (token && savedUser) {
                setUser(savedUser);
            }
        } catch (error) {
            console.error('Error checking auth state:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (username: string, password: string) => {
        try {   
            // Mock API call - replace with your actual API
            const response = await postApi<{ user: User; token: string }>('/auth/login', { username, password });
            console.log("🚀 ~ login ~ response:", response)

            // Save auth data
            await Promise.all([
                saveToken(response.token),
                saveUser(response.user)
            ]);

            setUser(response.user);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Clear stored auth data
            await clearAuthData();
            setUser(null);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};