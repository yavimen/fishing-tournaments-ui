import { jwtDecode } from 'jwt-decode';
import * as SecureStore from "expo-secure-store";

import { encode, decode } from 'base-64'; // Import encode and decode functions from base-64

if (!global.btoa) {
  global.btoa = encode; // Polyfill btoa function with encode function from base-64
}

if (!global.atob) {
  global.atob = decode; // Polyfill atob function with decode function from base-64
}

const USER_ID = "user_id";
const TOKEN_KEY = "jwt_token";

export const jwtService = {
    getUserId: async () =>  {
        let userId = await SecureStore.getItemAsync(USER_ID);    
        
        if (!userId) {
            const jwtToken = await SecureStore.getItemAsync(TOKEN_KEY);
            if (jwtToken) {
                try {
                    const claims = jwtDecode(jwtToken);
                    userId = claims['UserId'];
                    await SecureStore.setItemAsync(USER_ID, userId);
                }
                catch(err) {
                    console.log(err)
                }
            }
        }

        return userId;
    },
    isTokenExpired: (jwtToken) => {
        const decoded = jwtDecode(jwtToken);
        console.log(decoded)
        if (!decoded || !decoded.exp) {
          return true; // Token is invalid or doesn't have an expiration date
        }
        const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
        return decoded.exp < currentTime; // Check if the expiration time is in the past
      }
};
