import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { MonitorSmartphoneIcon, CreditCard, MonitorPlay, ArrowUpCircle } from "lucide-react";
import api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import NoNotesFound from "../components/NoNotesFound";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]);
    const [noteCount, setNoteCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
                // Fetch user profile
                const userResponse = await api.get("/users/profile");
                setUser(userResponse.data);
                
                // Fetch notes
                const notesResponse = await api.get("/notes");
                setNotes(notesResponse.data);
                setNoteCount(notesResponse.data.length);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                // If user is not authenticated, redirect to login
                navigate("/login");
                return;
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleNoteDelete = (deletedNoteId) => {
        setNotes(notes.filter(note => note._id !== deletedNoteId));
        setNoteCount(prev => prev - 1);
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto p-4 flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Welcome Section */}
            <div className="text-center mb-8">
                <div className="mb-4">
                    <MonitorSmartphoneIcon className="size-16 text-primary mx-auto mb-4" />
                    <h1 className="text-4xl font-bold mb-2">
                        Welcome back, {user?.name}! 👋🏼
                    </h1>
                    <p className="text-lg text-base-content/70">
                        Manage your screens. 
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card bg-base-200 shadow-lg">
                    <div className="card-body text-center">
                        <MonitorPlay className="size-8 text-primary mx-auto mb-2" />
                        <h3 className="card-title justify-center">Active Screens</h3>
                        <p className="text-sm text-base-content/70">
                           {noteCount} Active {noteCount === 1 ? 'Screen' : 'Screens'}
                        </p>
                        
                    </div>
                </div>
                
                <div className="card bg-base-200 shadow-lg">
                    <div className="card-body text-center">
                        <ArrowUpCircle className="size-8 text-accent mx-auto mb-2" />
                        <h3 className="card-title justify-center">Upgrade Plan</h3>
                        <p className="text-sm text-base-content/70">
                        Unlock more screens
                        </p>
                       
                        <button className="btn btn-accent btn-sm">Get More Screens</button>
                    </div>
                </div>
                
                <div className="card bg-base-200 shadow-lg">
                    <div className="card-body text-center">
                    <CreditCard className="size-8 text-secondary mx-auto mb-2" />
                        <h3 className="card-title justify-center">Next Billing Date</h3>
                        <p className="text-sm text-base-content/70">
                            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                       
                        <button className="btn btn-secondary btn-sm">Manage Subscription</button>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            {/* <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        to="/create" 
                        className="btn btn-primary btn-lg"
                    >
                        <MonitorPlay className="size-5 mr-2" />
                        Create New Screen
                    </Link>
                </div>
            </div> */}

            {/* Notes Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Your Screens</h2>
                {notes.length === 0 && (
                    <NoNotesFound/>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.length > 0 && (
                        notes.map((note) => (
                            <NoteCard 
                                key={note._id} 
                                note={note} 
                                onDelete={handleNoteDelete}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Tips Section */}
            {noteCount === 0 && (
                <div className="mt-12 p-6 bg-base-200 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                        <MonitorSmartphoneIcon className="size-8 text-primary mx-auto mb-4" />
                        How to use SignCast
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="size-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                                1
                            </div>
                            <div>
                                <h4 className="font-medium">Create Your First Screen</h4>
                                <p className="text-sm text-base-content/70">Click the "Create New Screen" button above to get started</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="size-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                                2
                            </div>
                            <div>
                                <h4 className="font-medium">Organize Your Screens</h4>
                                <p className="text-sm text-base-content/70">Use titles and content to keep your screens organized</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="size-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                                3
                            </div>
                            <div>
                                <h4 className="font-medium">Edit Anytime</h4>
                                <p className="text-sm text-base-content/70">Click on any screen to view, edit, or delete it</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="size-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                                4
                            </div>
                            <div>
                                <h4 className="font-medium">Stay Organized</h4>
                                    <p className="text-sm text-base-content/70">Your screens are automatically saved and synced</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard; 