import { MonitorSmartphoneIcon, LogInIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../lib/axios";


const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const {name, email, password, confirmPassword} = formData;
    
    const [passwordError, setPasswordError] = useState("");
    const [passwordLengthError, setPasswordLengthError] = useState("");
    const navigate = useNavigate();

    // onChange function to update form data
    const onChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    // Function to validate password complexity
const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
};

    // handleSubmit function to register user
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        // Reset errors
        setPasswordError("");
        setPasswordLengthError("");
        
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        if (password.length < 8) {
            setPasswordLengthError("Password must be at least 8 characters long");
            return;
        }

        if(!validatePassword(password)) {
            setPasswordError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
            return;
        }

        try {
            const response = await api.post("/users", { name, email, password });
            console.log(response);
            if (response.status === 201) {
                //Cookie is set automatically by the server
                // Dispatch custom event to notify Navbar to refetch user data
                window.dispatchEvent(new CustomEvent('userLoggedIn'));
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error registering user:", error.response?.data?.message || error.message);
            if (error.response?.data?.message) {
                setPasswordError(error.response.data.message);
            }
        }
    }
    return (
        <main className="max-w-sm mx-auto mt-10 p-8 bg-base-300 border-2 border-base-content/10 rounded-2xl shadow-md">
            <div className="row justify-content-center">
                <section className="col-6 mt-5 space-y-4">
                    {/* Logo */}
                    <div className=" mx-auto w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MonitorSmartphoneIcon className="size-15 text-primary"/>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div className="form-control">
                            <label htmlFor="name" className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" className="input input-bordered" id="name" placeholder="Enter your name" value={name} onChange={onChange} autoComplete="name" />
                        </div>
                        {/* Email */}
                        <div className="form-control">
                            <label htmlFor="email" className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" className="input input-bordered" id="email" placeholder="Enter email" value={email} onChange={onChange} autoComplete="email" />
                        </div>
                        {/* Password */}
                        <div className="form-control">
                                <label htmlFor="password" className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" className="input input-bordered" id="password" placeholder="Enter password" value={password} onChange={onChange} autoComplete="new-password" />
                            <p className="text-sm text-error">{passwordError}</p>
                            <p className="text-sm text-warning mt-2 opacity-50">{passwordLengthError}</p>
                            
                        </div>
                        {/* Confirm Password */}
                        <div className="form-control">
                            <label htmlFor="confirmPassword" className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" className="input input-bordered" id="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={onChange} autoComplete="new-password" />
                        </div>  
                        {/* Submit */}
                        <button type="submit" className="btn btn-primary btn-outline w-full "> 
                            <LogInIcon className="size-4 mr-2"/>
                            Register</button>
                    </form>
                </section>
            </div>
        </main>
    )
}

export default Register;