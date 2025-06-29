import { Link } from "react-router";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8">
                {/* 404 Icon */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="size-32 text-primary/20 mx-auto mb-4" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl font-bold text-primary">404</span>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
                <p className="text-base-content/70 mb-8">
                    Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        to="/" 
                        className="btn btn-primary"
                    >
                        <Home className="size-4 mr-2" />
                        Go Home
                    </Link>
                    <button 
                        onClick={() => window.history.back()} 
                        className="btn btn-outline"
                    >
                        <ArrowLeft className="size-4 mr-2" />
                        Go Back
                    </button>
                </div>

                {/* Helpful Links */}
                <div className="mt-8 pt-8 border-t border-base-content/10">
                    <p className="text-sm text-base-content/60 mb-4">Looking for something specific?</p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
                        <Link to="/login" className="link link-primary">Login</Link>
                        <span className="hidden sm:inline text-base-content/40">•</span>
                        <Link to="/register" className="link link-primary">Register</Link>
                        <span className="hidden sm:inline text-base-content/40">•</span>
                        <Link to="/dashboard" className="link link-primary">Dashboard</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound; 