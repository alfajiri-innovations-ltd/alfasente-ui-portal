(function () {
  // check if the token is present in the request headers
  const token = localStorage.getItem("alfasente_user_tkn") || null;
  const router = window.location.href;

  if (!token) {
    // Check if the request is for a specific route
    if (
      router !== "/login" &&
      router !== "/register" &&
      router !== "/forgot-password"
    ) {
      // Perform some middleware logic
      console.log("Middleware executed for /api/specific-route");
    } else {
      // Redirect to the login page if the token is not present
      window.location.href = "/login";
    }
  }
})();
