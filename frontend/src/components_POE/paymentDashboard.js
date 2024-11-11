import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function PaymentDashboard() {
    const [form, setForm] = useState({
        cp_recipientFullName: "",
        cp_recipientAddress: "",
        cp_recipientCity: "",
        cp_recipientPostalCode: "",
        cp_recipientCountry: "",
        cp_swiftBankName: "",
        cp_swiftCode: "",
        cp_swiftIntBankNumber: "",
        cp_amount: "",
        cp_currency: "ZAR",
        cp_payReference: ""
    });

    const navigate = useNavigate();

    function updateForm(value) {
        setForm((prev) => ({ ...prev, ...value }));
    }

    function logout() {
        sessionStorage.removeItem('token');
        navigate("/");
    }    

    async function handlePayment(e) {
        e.preventDefault();
    
        // Retrieve the token from sessionStorage
        const token = sessionStorage.getItem('token');
    
        if (!token) {
            window.alert("You Do Not Have Permission to use this page. Please log in again.");
            navigate("/");
            return;
        }
    
        try {
            const response = await fetch("https://localhost:3001/payment/MakePayment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                window.alert(data.message);
                return;
            }
    
            window.alert(`Payment successful! Payment ID: ${data.paymentId}`);

            // Clear the form fields
            setForm({
                cp_recipientFullName: "",
                cp_recipientAddress: "",
                cp_recipientCity: "",
                cp_recipientPostalCode: "",
                cp_recipientCountry: "",
                cp_swiftBankName: "",
                cp_swiftCode: "",
                cp_swiftIntBankNumber: "",
                cp_amount: "",
                cp_currency: "ZAR",
                cp_payReference: ""
            });
            
        } catch (error) {
            console.error("Payment error:", error);
            window.alert("An unexpected error occurred. Please try again.");
        }
    }
    
    return (
        <div>
            <br />
            <form onSubmit={handlePayment}>
                <div className="detailcontainer">
                    <div className="detailcolumn">
                        <div className="innerContent">
                            <button onClick={logout} className="btn btn-primary">Logout</button>
                            <br></br>
                        </div>
                        <h3>Make a Payment</h3>
                        <div className="innerContent">
                            <div className="form-group">
                                <label>Recipient Fullname</label>
                                <input type="text" className="form-control" value={form.cp_recipientFullName} onChange={(e) => updateForm({ cp_recipientFullName: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Recipient Address</label>
                                <input type="text" className="form-control" value={form.cp_recipientAddress} onChange={(e) => updateForm({ cp_recipientAddress: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Recipient City</label>
                                <input type="text" className="form-control" value={form.cp_recipientCity} onChange={(e) => updateForm({ cp_recipientCity: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Recipient Postal Code</label>
                                <input type="text" className="form-control" value={form.cp_recipientPostalCode} onChange={(e) => updateForm({ cp_recipientPostalCode: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Recipient Country</label>
                                <input type="text" className="form-control" value={form.cp_recipientCountry} onChange={(e) => updateForm({ cp_recipientCountry: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Swift Bank Name</label>
                                <input type="text" className="form-control" value={form.cp_swiftBankName} onChange={(e) => updateForm({ cp_swiftBankName: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>SWIFT Code</label>
                                <input type="text" className="form-control" value={form.cp_swiftCode} onChange={(e) => updateForm({ cp_swiftCode: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Swift International Bank Number</label>
                                <input type="text" className="form-control" value={form.cp_swiftIntBankNumber} onChange={(e) => updateForm({ cp_swiftIntBankNumber: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Amount</label>
                                <input type="number" className="form-control" value={form.cp_amount} onChange={(e) => updateForm({ cp_amount: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Currency</label>
                                <select className="form-control" value={form.cp_currency} onChange={(e) => updateForm({ cp_currency: e.target.value })}>
                                    <option value="ZAR">South African Rand</option>
                                    <option value="USD">US Dollar</option>
                                    <option value="EUR">Euro</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Reference</label>
                                <input type="text" className="form-control" value={form.cp_payReference} onChange={(e) => updateForm({ cp_payReference: e.target.value })} />
                            </div>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">Proceed with Payment</button>
                    </div>
                </div>
            </form>
        </div>
    );
}