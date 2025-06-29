import { Trash2Icon, PenSquareIcon} from "lucide-react";
import { Link } from "react-router";
import formatDate from "../lib/utils";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import api from "../lib/axios";

const NoteCard = ({note, onDelete}) => {
    const navigate = useNavigate();
    const handleEdit = (e) => {
        e.preventDefault();
        try {
            navigate(`/note/${note._id}`);
        } catch (error) {
            toast.error("Error editing note");
        }
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this note?")) {
        try {
            await api.delete(`/notes/${note._id}`);
            toast.success("Note deleted successfully");
            onDelete(note._id);
                } catch (error) {
                toast.error("Failed to delete note");
            }
        }
    }
    return (
        <div >
           

<div className=" card bg-base-200 border-t-4 border-primary transition-all duration-300 hover:border-primary/75 ">
            <Link to={`/note/${note._id}`} className="card-body">
                <h2 className="card-title text-lg font-bold text-base-content"> {note.title} </h2>
                <p className="text-sm text-base-content/80"> {note.content} </p>
                <div className="card-actions justify-between items-center">
                    <span className="text-sm text-base-content/80"> {formatDate(note.createdAt)} </span>
                    <div className="flex gap-2 items-center">
                        <button className="btn btn-ghost btn-sm" onClick={handleEdit}>
                            <PenSquareIcon className="size-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm" onClick={handleDelete}>
                            <Trash2Icon className="size-4 text-error" />
                        </button>   
                    </div>
                </div>
            </Link>
        </div>
        </div>
        
    )
}

export default NoteCard;