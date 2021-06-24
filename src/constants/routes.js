  
const publicRoutes = {
    LOGIN: "/login",
    REGISTER: "/register",
    TYPE: "/type",
    REGISTERUSER: "/registeruser",
    REGISTERADMIN: "/registeradmin"
  };
  
  const privateRoutes = {
    HOME: "/",
    PUBLICATIONS: "/publications"
  };
  
  const Routes = {
    ...publicRoutes,
    ...privateRoutes,
  };
  export default Routes;