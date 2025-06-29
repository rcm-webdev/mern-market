import { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router";
import { ArrowLeftIcon, PlusIcon} from "lucide-react";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const CreateNote = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error("Please fill in all fields");
            return;
        }
        setIsLoading(true);
        try {
            const response = await api.post("/notes", { title, content });
            console.log(response);
            toast.success("You've created a new note", {
                icon: "🎉",
                className: "bg-gradient-to-r from-accent via-accent-focus to-primary",
                
            });
            navigate("/dashboard");
        } catch (error) {
            toast.error("Failed to create note");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto p-4">
               <div className="max-w-2xl mx-auto">
                <Link to="/dashboard" className="btn btn-accent btn-outline mb-4">
                <ArrowLeftIcon className="size-4" />
                Back to Notes</Link>

                <div className="card bg-base-100 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title text-2xl font-bold text-base-content">Create New Note</h2>
                        <form id="create-note-form" onSubmit={handleSubmit} className="mt-4 space-y-4">
                            <div className="form-control">
                                <label htmlFor="title" className="label text-base-content/80 font-semibold mb-2">
                                    <span className="label-text">Title</span>
                                </label>
                                <input 
                                    id="title"
                                    type="text" 
                                    placeholder="Title" 
                                    className="input input-bordered w-full" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="content" className="label text-base-content/80 font-semibold mb-2">
                                    <span className="label-text">Content</span>
                                </label>
                                <textarea 
                                    id="content"
                                    placeholder="Content" 
                                    className="textarea textarea-bordered w-full" 
                                    value={content} 
                                    onChange={(e) => setContent(e.target.value)} 
                                />
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button type="submit" className="btn btn-ghost border-base-content/20" disabled={isLoading}>
                                    <PlusIcon className="size-4 mr-2" />
                                    {isLoading ? "Creating..." : "Create Note"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

               </div>
            </div>
        </div>
    )
}

export default CreateNote;