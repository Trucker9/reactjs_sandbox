import React from "react";

// First we create this object. AuthContext.Provider is the actual react Component we gonna use.
// Anything that is wrapped in <AuthContext.Provider> </AuthContext.Provider> will have access to this context data's. 
// We can add data to the context with value={{data}} in JSX.
const AuthContext = React.createContext({
  isLoggedIn: true,
  onLogout: ()=>{} // We fill "onLogout" later with value={{}};
});

export default AuthContext;