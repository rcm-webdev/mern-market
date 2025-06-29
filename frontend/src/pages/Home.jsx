import { Link } from "react-router";
import { ArrowRight, MonitorSmartphoneIcon, RefreshCcw, LayoutGrid, MonitorPlay } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../lib/axios";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            // Prevent multiple auth checks
            if (authChecked) return;

            try {
                // Make API call - cookies will be sent automatically
                const response = await api.get("/users/profile");
                setIsLoggedIn(response.status === 200);
            } catch (error) {
                console.log("User not authenticated");
                setIsLoggedIn(false);
            } finally {
                setAuthChecked(true);
            }
        };
        
        checkAuth();
    }, [authChecked]);

            return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Hero Section */}
            <div className="text-center py-16">
                <div className="mb-8">
                    <MonitorSmartphoneIcon className="size-20 text-primary mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Take Control of Every Display—
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Instantly </span>
                       
                    </h1>
                    <p className="text-xl text-base-content/70 max-w-2xl mx-auto mb-8">
                    Control, customize, and launch eye-catching digital signage from anywhere—in minutes.
                    </p>
                    {isLoggedIn ? (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/dashboard" className="btn btn-primary btn-lg">
                                Go to Dashboard
                            </Link>
                        </div>
                    ) : (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/register" 
                            className="btn btn-primary btn-lg"
                        >
                            Get Started Free
                            <ArrowRight className="size-5 ml-2" />
                        </Link>
                        <Link 
                            to="/login" 
                            className="btn btn-outline btn-lg"
                        >
                            Sign In
                        </Link>
                    </div>
                    )}
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Why Choose SignCast?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <RefreshCcw className="size-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Remote Control</h3>
                        <p className="text-base-content/70">
                        Update your screens remotely and in real time. Promote new products, flash sales, or announcements with just a few clicks.
                        </p>
                    </div>
                    
                    <div className="text-center">
                        <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <LayoutGrid className="size-8 text-accent" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Easy to Use</h3>
                        <p className="text-base-content/70">
                        No design skills needed. Easily build beautiful layouts using our intuitive drag-and-drop editor, with templates to get you started.
                        </p>
                    </div>
                    
                    <div className="text-center">
                        <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <MonitorPlay className="size-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Multi-Platform</h3>
                        <p className="text-base-content/70">
                        From TVs and tablets to kiosks and video walls—our app works with any internet-connected display.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 text-center">
                <div className="bg-base-200 rounded-2xl p-8 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">
                    Ready to Captivate Your Audience?
                    </h2>
                    <p className="text-base-content/70 mb-6">
                    Start transforming your screens into powerful marketing tools today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/register" 
                            className="btn btn-primary"
                        >
                            Launch Your First Display
                        </Link>
                        <Link 
                            to="/login" 
                            className="btn btn-outline"
                        >
                            Sign In to Existing Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;