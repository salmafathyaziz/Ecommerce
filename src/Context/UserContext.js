import { createContext, useState } from "react";

//maynfa3sh astkhdem use navigate fy component men elrouting beta3y (child), da el2ab

export let UserContext = createContext();

export default function UserContextProvider(props) {
  let [userToken, setUserToken] = useState(null);
  //eltoken hayfdal null lehad ma el login tedkhol fy elmessage succes and then set it
   //keda el app ye2dar yestkhdem usertoken and setusertoken



  return <UserContext.Provider value={{ userToken, setUserToken }}>
      {props.children}
    </UserContext.Provider>
 ;
}
