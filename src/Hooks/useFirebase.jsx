import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useFirebase = () => {
  const [user, setUser] = useState(() => {
    // ✅ Load user from localStorage when the app starts
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [admin, setAdmin] = useState(false);
  const [subadmin, setsubAdmin] = useState(false);
  const [error] = useState("");
  const [toggle, setToggle] = useState(false);

  // Register user with email and password (without Firebase Auth)
  const registerUser = (email, password, name,phoneNumber, location, navigate) => {
    setIsLoading(true);

    // Simulate email verification (your API might handle this)
    const verifyEmail = () => {
      console.log("Email verified");
    };

    verifyEmail();
    
    const newUser = { email, displayName: name,phoneNumber };
    setUser(newUser);

    // Save user to database via API (not Firebase)
    sendUser(email, name, phoneNumber, 'POST');

    setAuthError('');
    const destination = location?.state?.from || '/';
    navigate(destination); // Use navigate to redirect after registration

    setIsLoading(false);
  };

  // Login with email and password (without Firebase Auth)
   // ✅ Save user to localStorage on login
  

   const loginWithOwnEmailAndPass = async (phoneNumber, password, location, navigate) => {
    setIsLoading(true);
    setAuthError(""); // Clear previous errors
  
    try {
      const response = await fetch(`https://qtec-backend.onrender.com/usersblock/${phoneNumber}`);
  
      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: "Phone number or password is incorrect!",
        });
        setIsLoading(false);
        return;
      }
  
      const userData = await response.json();
  
      if (!userData?.phoneNumber) {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: "Phone number or password is incorrect!",
        });
        setIsLoading(false);
        return;
      }
  
      if (userData.status === "blocked") {
        Swal.fire({
          icon: "error",
          title: "Account Blocked!",
          text: "Your account is blocked. Contact support.",
        });
        setIsLoading(false);
        return;
      }
  
      // Ensure password matches
      if (userData.password !== password) {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: "Phone number or password is incorrect!",
        });
        setIsLoading(false);
        return;
      }
  
      // Store user data in state and localStorage
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
  
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        timer: 2000,
        showConfirmButton: false,
      });
  
      // Navigate after login
      const destination = location?.state?.from || "/";
      navigate(destination);
      setAuthError("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  



  // ✅ Ensure user is loaded from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  
  

  // Log out user
  const userLogOut = (navigate) => {
    setIsLoading(true);
    setToggle(false);
    setUser(null); // Clear user state
    localStorage.removeItem("user"); // Clear user session
    navigate("/"); // Redirect to home after logout
    setIsLoading(false);
  };
  

  // Save user to the database via API
 
  const sendUser = (email, displayName, phoneNumber, method) => {
    const user = { email, displayName, phoneNumber };
  
    fetch(`https://qtec-backend.onrender.com/usersdatasd`, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          alert(data.message); // Show error if phone number is already registered
        } else {
          alert("User registered successfully!");
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  

  // Load admin role from the database
  useEffect(() => {
    if (user?.phoneNumber) {
      fetch(`https://qtec-backend.onrender.com/userLogin/${user?.phoneNumber}`)
        .then((res) => res.json())
        .then((data) => setAdmin(data?.admin));
    }
  }, [user?.phoneNumber]);

  // load the subadmin 
  useEffect(() => {
    if (user?.phoneNumber) {
      fetch(`https://qtec-backend.onrender.com/userLoginsubadmin/${user?.phoneNumber}`)
        .then((res) => res.json())
        .then((data) => setsubAdmin(data?.subadmin));
    }
  }, [user?.phoneNumber]);

  return {
    user,
    registerUser,
    isLoading,
    authError,
    toggle,
    setToggle,
    error,
    admin,
    subadmin,
    userLogOut,
    loginWithOwnEmailAndPass,
  };
};

export default useFirebase;
