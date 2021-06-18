  
const publicRoutes = {
    LOGIN: "/login",
    REGISTER: "/register",
    INFORMATION: "/information",
  };
  
  const privateRoutes = {
    HOME: "/",
  };
  
  const Routes = {
    ...publicRoutes,
    ...privateRoutes,
  };
  export default Routes;