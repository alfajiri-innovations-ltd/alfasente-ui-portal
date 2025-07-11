import { getUserToken } from "../cookies/UserMangementCookie";

export const authService = {
    isAuthenticated: () => {
        try {
            // Check if the jwt token exists
            const token = getUserToken();
            if (!token) {
                return false;
            }

            // Validate token structure (should have 3 parts separated by dots)
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                return false;
            }

            // Decode and parse the payload
            const payload = JSON.parse(atob(tokenParts[1]));
            // console.log('Decoded JWT payload:', payload);
            // Check if exp claim exists
            if (!payload.exp) {
                return false;
            }

            // Compare expiration time with current time
            const currentTime = Math.floor(Date.now() / 1000);
            const check = payload.exp > currentTime;
            // console.log('Token is valid:', check);
            return check;

        } catch (error) {
            // Handle any decoding or parsing errors
            console.error('Error validating JWT token:', error);
            return false;
        }
    }
}