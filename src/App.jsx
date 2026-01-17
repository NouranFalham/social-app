import "./App.css";
import { Bounce, ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PostDetailsPage from "./pages/PostDetailsPage/PostDetailsPage";
import NotFound from "./pages/NotFound/NotFound";
import AuthProvider from "./assets/Context/Auth.context/Auth.context";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthRoute from "./Components/AuthRoute/AuthRoute";
import UserContextProvider from "./assets/Context/User.context/User.context";

function App() {

  const router =createBrowserRouter([
    {path:"/", element: <ProtectedRoute> <Home/> </ProtectedRoute>},
    {path:"/login", element:  <AuthRoute> <Login/> </AuthRoute> },
    {path:"/signup", element:  <SignUp/>  },
    // {path:"/signup", element: <AuthRoute> <SignUp/> </AuthRoute> },
    {path:"/profile", element:<ProtectedRoute> <ProfilePage/> </ProtectedRoute>},
    {path:"/post/:id", element:<ProtectedRoute> <PostDetailsPage/> </ProtectedRoute>},
    {path:"*", element: <NotFound/>}
  ])
  return (
    <>
      <AuthProvider>
        <UserContextProvider>
        <RouterProvider router={router}/>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      </UserContextProvider>
      </AuthProvider>
    </>
  );
}

export default App;
