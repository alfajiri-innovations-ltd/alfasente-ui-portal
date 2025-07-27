// import { jwtDecode } from "jwt-decode";
import { IClient, User } from "../interfaces/interfaces";

const setClient = (client: IClient) => {
  localStorage.setItem("client", JSON.stringify(client));
};

const getClient = () => {
  const client =
    typeof window !== "undefined" && localStorage.getItem("client");

  if (client) {
    try {
      return JSON.parse(client);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }

  return null;
};
const setUserToken = (accessToken: string) => {
  localStorage.setItem("alfasente_user_tkn", accessToken);
};

const setAuthUser = (userData: unknown) => {
  localStorage.setItem("alfasente_user", JSON.stringify(userData));
};

const getUserToken = () => {
  return localStorage.getItem("alfasente_user_tkn") ?? null;
};

const getAuthUser = (): User | undefined => {
  const user =
    typeof window !== "undefined" && localStorage.getItem("alfasente_user");

  if (user) {
    try {
      return JSON.parse(user) as User;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return undefined;
    }
  }

  return undefined;
};

const deleteUserToken = () => {
  localStorage.removeItem("alfasente_user_tkn");
};

const deleteAuthUser = () => {
  localStorage.removeItem("alfasente_user");
};

const logout = () => {
  localStorage.removeItem("alfasente_user_tkn");
  localStorage.removeItem("alfasente_user");
};

// const isAuthTokenExpired = (expirationTime: number) => {
//   const currentTime = Math.floor(Date.now() / 1000);

//   return expirationTime < currentTime;
// };

// const decodeToken = (token: string) => {
//   return jwtDecode(token);
// };

// const isAuthenticated = () => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("alfasente_user_tkn") ?? null;
//     // console.log("Token:", token);
//     if (token) {
//       const decodedToken = decodeToken(token);
//       if (decodedToken.exp !== undefined) {
//         const isTokenExpired = isAuthTokenExpired(decodedToken.exp);
//         if (isTokenExpired) {
//           console.log("Token expired");
//           localStorage.removeItem("alfasente_user_tkn");

//         }
//         return !isTokenExpired;
//       }
//     }
//   }
//   return false;
// };

export {
  setUserToken,
  setClient,
  getClient,
  // isAuthenticated,
  getUserToken,
  deleteUserToken,
  setAuthUser,
  getAuthUser,
  deleteAuthUser,
  logout,
};
