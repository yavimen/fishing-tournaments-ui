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

const jwtService = {
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
    }
};

export default jwtService;
