// "use client";

// import { useEffect, useState } from "react";
// import UserContext from "./userContext";
// import { CurrentUser } from "@/Services/userService";

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(undefined);
//   const [loading, setLoading] = useState(true);
  

//   useEffect(() => {
//     async function Load() {
//       try {
//         const logUser = await CurrentUser();
//         console.log(logUser);
//         setUser({ ...logUser });
//       } catch (error) {
//         console.log(error);
//         setUser(undefined);
//       }
//       setLoading(false);
//     }

//     Load();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;



// context/userProvider.js
"use client";

import { useEffect, useState } from "react";
import UserContext from "./userContext";
import { CurrentUser } from "@/Services/userService";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() { // Renamed Load to loadUser for convention
      try {
        const logUser = await CurrentUser();
        console.log("Current user loaded:", logUser);
        setUser(logUser); // Directly set logUser as it should be the user object
      } catch (error) {
        console.error("Error loading current user:", error); // Use console.error
        setUser(undefined);
      } finally {
        setLoading(false); // Ensure loading is set to false even on error
      }
    }

    loadUser();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;