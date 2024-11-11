import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function StaffLogin() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    function updateForm(value) {
        setForm((prev) => ({ ...prev, ...value }));
    }

    async function onSubmit(e) {

        e.preventDefault();
    
        try {
            // Send a POST request to the server with the login form data
            const response = await fetch("https://localhost:3001/staff/staffLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
    
            // Parse the response
            const data = await response.json();
    
            // Check if the response status is not OK (400 or 500 level errors)
            if (!response.ok) {
                // Display the error message on the window
                window.alert(data.message); // This will display the validation error on the window
                return;
            } 
            else 
            {
                window.alert(data.message);
                // Save the token to localStorage
                sessionStorage.setItem('staffToken', data.token);

                // Navigate to the payment dashboard
                navigate("/transactionVerificationPortal");
            }
            
        } catch (error) {
            console.error("Error during login:", error);
            window.alert("An unexpected error occurred. Please try again later.");
        }
    }

    return (
        <div>
            <br></br>
            <form onSubmit={onSubmit}>
                <div class="detailcontainer">
                    <div class=" detailcolumn">
                    <h3>Staff Login</h3>
                        <div class="innerContent">
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" value={form.username} onChange={(e) => updateForm({ username: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" value={form.password} onChange={(e) => updateForm({ password: e.target.value })} />
                            </div>
                        </div>
                        <br></br>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
}