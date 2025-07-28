// app/api/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

const API_BASE_URL = 'https://your-api.com/api';
const TOKEN_KEY = 'auth_token';

// Store token
export const storeToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

// Get stored token
export const getStoredToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

// Remove token
export const removeToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

// API call helper with token
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = await getStoredToken();
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  const data = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  
  // Store token
  await storeToken(data.token);
  
  return data;
};

// Register user
export const registerUser = async (userData: RegisterData): Promise<{ user: User; token: string }> => {
  const data = await apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  
  // Store token
  await storeToken(data.token);
  
  return data;
};

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  return await apiCall('/auth/me');
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  await removeToken();
  // Optionally call logout endpoint
  // await apiCall('/auth/logout', { method: 'POST' });
};

// Check if user has valid token
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const token = await getStoredToken();
    if (!token) return false;
    
    // Verify token with server
    await getCurrentUser();
    return true;
  } catch {
    // Token invalid, remove it
    await removeToken();
    return false;
  }
};