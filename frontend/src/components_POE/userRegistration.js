import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function UserRegistration() {
    const [form, setForm] = useState({
        c_fullName: "",
        username: "",
        c_idNumber: "",
        c_accountNumber: "",
        password: ""
    });

    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => ({ ...prev, ...value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
    
        try {
            const response = await fetch("https://localhost:3001/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
    
            // Parse the response
            const data = await response.json();
    
            // Check if the response status is not OK (400 or 500 level errors)
            if (!response.ok) {
                // Display the error message from the server
                window.alert(data.message);
                return;
            }
    
            // If successful, clear the form and navigate to the homepage
            window.alert(data.message); // Display success message
            setForm({ c_fullName: "", username: "", c_idNumber: "", c_accountNumber: "", password: "" });
            navigate("/");
        } catch (error) {
            // Handle any network errors
            window.alert("An unexpected error occurred. Please try again.");
            console.error("Error:", error);
        }
    }
    

    return (
        <div>
            <br></br>
            
            <form onSubmit={onSubmit}>
                <div class="detailcontainer">
                    <div class=" detailcolumn">
                        <h3>Register</h3>
                        <div class="innerContent">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" className="form-control" value={form.c_fullName} onChange={(e) => updateForm({ c_fullName: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" value={form.username} onChange={(e) => updateForm({ username: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>ID Number</label>
                                <input type="text" className="form-control" value={form.c_idNumber} onChange={(e) => updateForm({ c_idNumber: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Account Number</label>
                                <input type="text" className="form-control" value={form.c_accountNumber} onChange={(e) => updateForm({ c_accountNumber: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" value={form.password} onChange={(e) => updateForm({ password: e.target.value })} />
                            </div>
                        </div>
                        <br></br>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </div>
            </form>
        </div>
    );
}