  
const publicRoutes = {
  LOGIN: "/login",
  TYPE: "/type",
  REGISTERUSER: "/registeruser",
  REGISTERADMIN: "/registeradmin"
};
  
const privateRoutes = {
  HOME: "/",
  PUBLICATIONS: "/publications",
  PROFILEUSER: "/users",
  PROFILEFOUNDATION: "/foundations",
  NEWPUBLICATION: "/publications/new",
  ADMINISTRATION: "/administration",
  ADMINISTRATIONPROFILES: "/administration/profiles",
  ADMINISTRATIONREQUEST: "/administration/request"
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};

export default Routes;

// import { lazy } from 'react';

// const routes = [
//   {
//     path: 'home',
//     component: lazy(() => import('components/Home')),
//     exact: true
//   },
//   {
//     path: 'users',
//     component: lazy(() => import('components/Users')),
//     exact: true
//   }
// ];

// export default routes;