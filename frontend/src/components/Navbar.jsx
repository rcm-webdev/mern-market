import { Link, useNavigate } from "react-router";
import { LogInIcon, UserPlusIcon, BookOpen, MonitorSmartphoneIcon, MonitorUp, LogOutIcon } from "lucide-react";
import api from "../lib/axios";
import { useState, useEffect } from "react";   

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUser = async () => {
            try{
                const response = await api.get("/users/profile");
                console.log("User profile response:", response.data);
                setUser(response.data);
            } catch (error) {
                // Only log non-authentication errors
                if (error.response?.status !== 401) {
                    console.error("Error fetching user profile:", error);
                }
                setUser(null);
            }
            setHasCheckedAuth(true);
        }
        
        // Only check auth once per session unless explicitly triggered
        if (!hasCheckedAuth) {
            fetchUser();
        }
        
        // Listen for login event
        const handleUserLogin = () => {
            fetchUser();
        };
        
        // Listen for logout event  
        const handleUserLogout = () => {
            setUser(null);
            setHasCheckedAuth(true); // Don't recheck after logout
        };
        
        window.addEventListener('userLoggedIn', handleUserLogin);
        window.addEventListener('userLoggedOut', handleUserLogout);
        
        // Cleanup event listeners
        return () => {
            window.removeEventListener('userLoggedIn', handleUserLogin);
            window.removeEventListener('userLoggedOut', handleUserLogout);
        };
    }, [hasCheckedAuth]);

    const handleLogout = async () => {
        try {
            await api.post("/users/logout");
            setUser(null);
            
            // Dispatch logout event
            window.dispatchEvent(new CustomEvent('userLoggedOut'));
            
            // Redirect to login page
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
            
            setUser(null);
            navigate("/login");
        }
    };

    return (
    <header className="bg-base-300 border-b border-base-content/10">
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center">
                <Link className="btn btn-ghost text-xl" to={user ? "/dashboard" : "/"}>
                <MonitorSmartphoneIcon className="size-8 text-primary" />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SignCast</span>
                </Link>
                <nav className="flex items-center gap-2">
                    {/* Show login/register buttons only when user is not logged in */}
                    {!user && (
                        <>
                            <div className="flex items-center gap-2">
                                <Link className="btn btn-primary btn-outline" to="/login">
                                <LogInIcon className="size-4 font-bold mr-2" />
                                   <span className="hidden md:inline ">Login</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link className="btn btn-primary btn-outline" to="/register">
                                 <UserPlusIcon className="size-4 font-bold mr-2" />
                                   <span className="hidden md:inline ">Register</span>
                                </Link>
                            </div>
                        </>
                    )}

                    <div className="flex items-center gap-2">
                    {user && (
                        <>
                            <Link className="btn btn-primary btn-outline " to="/create">
                                <MonitorUp className="size-4 font-bold mr-2" />
                                <span className="hidden md:inline ">Create Screen</span>
                            </Link>
                            
                        </>
                    )}
                    {user && (
                        <div className="dropdown dropdown-end">
                          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-placeholder">
                            <div className="bg-neutral text-neutral-content w-12 rounded-full">
                              {/* Show user's first letter when logged in */}
                              {user.name ? (
                                <span className="">{user.name.charAt(0).toUpperCase()}</span>
                              ) : (
                                <span className=""></span>
                              )}
                            </div>
                          </div>
                          <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 gap-2 shadow">
                              {/* Dashboard */}
                                <li>
                            <Link className="btn btn-ghost" to="/dashboard">
                                {/* <BookOpen className="size-4 font-bold mr-2" /> */}
                                <span className="hidden md:inline ">Dashboard</span>
                            </Link>
                            </li>
                            {/* Manage Subscription */}
                            <li>
                                    <Link className="btn btn-secondary btn-outline w-full" to="/dashboard">Manage Subscription</Link>
                                </li>
                            {/* Logout */}
                            <li>
                              <button onClick={handleLogout} className="btn btn-error btn-outline w-full">
                                <LogOutIcon className="size-4 font-bold mr-2" />
                                Logout
                              </button>
                            </li>
                            
                          </ul>
                        </div>
                    )}
                    </div>
                    
                </nav>
            </div>
        </div>
        </header>
    )
}

export default Navbar;