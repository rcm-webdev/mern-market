import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeftIcon, Trash2Icon, SaveIcon } from "lucide-react";
import api from "../lib/axios";
import { toast } from "react-hot-toast";


//place to update notes
const Note = () => {
    const { id } = useParams(); 
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();



    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                await api.delete(`/notes/${id}`);
                toast.success("Note deleted successfully");
                navigate("/dashboard");
            } catch (error) {
                toast.error("Failed to delete note");
            }
        }
    }
    const handleSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!note.title || !note.content) {
            toast.error("Please fill in all fields");
            return;
        }
        try {
            setSaving(true);
            await api.put(`/notes/${id}`, note);
            toast.success("Note updated successfully");
            navigate("/dashboard");
        } catch (error) {
            toast.error("Failed to update note");
        } finally {
            setSaving(false);
        }
    }
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await api.get(`/notes/${id}`);
                setNote(response.data);
            } catch (error) {
                toast.error("Failed to fetch note"); 
            } finally {
                setIsLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    if (!note) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Note not found</h2>
                    <Link to="/dashboard" className="btn btn-primary">
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Back to Notes
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <Link to="/dashboard" className="btn btn-accent btn-outline">
                  <ArrowLeftIcon className="h-5 w-5" />
                  Back to Notes
                </Link>
                <button onClick={handleDelete} className="btn btn-error btn-outline">
                  <Trash2Icon className="h-5 w-5" />
                  Delete Note
                </button>
              </div>
    
              <div className="card bg-base-100">
                <div className="card-body">
                  <div className="form-control flex flex-col mb-4 space-y-2">
                    <label htmlFor="title" className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      id="title"
                      type="text"
                      placeholder="Note title"
                      className="input input-bordered"
                      value={note.title}
                      onChange={(e) => setNote({ ...note, title: e.target.value })}
                    />
                  </div>
    
                  <div className="form-control flex flex-col mb-4 space-y-2">
                    <label htmlFor="content" className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      id="content"
                      placeholder="Write your note here..."
                      className="textarea textarea-bordered h-32"
                      value={note.content}
                      onChange={(e) => setNote({ ...note, content: e.target.value })}
                    />
                  </div>
    
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-outline" disabled={saving} onClick={handleSave}>
                        <SaveIcon className="size-4 mr-2" />
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Note;