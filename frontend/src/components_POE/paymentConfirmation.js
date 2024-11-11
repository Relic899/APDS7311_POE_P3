import React from "react";
import { useLocation, useNavigate } from "react-router";

export default function PaymentConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();

    // Access the state passed from the previous page
    const form = location.state || {};
    const { _id } = form; // Extract _id 

    function cancel() {
        navigate("/transactionVerificationPortal");
    }    

    // Function to handle both actions: Submit to SWIFT and Delete
    const handleBothActions = async (id) => {
        const submitSuccess = await submitToSWIFT();
        if (submitSuccess) {
            await deletePayment(id);
        }
    };

    const submitToSWIFT = async () => {
        try {
            // Retrieve the token from sessionStorage
            const staffToken = sessionStorage.getItem('staffToken');
            
            if (!staffToken) 
            {
                window.alert("You Do Not Have Permission to use this page. Please log in again.");
                navigate("/staffLogin");
                return;
            }

            const response = await fetch("https://localhost:3001/payment/submitToSwift", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${staffToken}`
                },
                body: JSON.stringify(form),
            });
    
            if (response.ok) {
                window.alert("Transaction successfully submitted to SWIFT.");
                
                // Redirect the user to the transactions verification portal
                navigate("/transactionVerificationPortal");
                
                return true;
            } else {
                const errorData = await response.json();
                window.alert(`Failed to submit transaction: ${errorData.message}`);
                return false;
            }
        } catch (error) {
            console.error("Error submitting transaction:", error);
            window.alert("An error occurred while submitting the transaction.");
    
            // Redirect back to the transactions verification portal in case of an error
            navigate("/transactionVerificationPortal");
            return false;
        }
    };    

    const deletePayment = async (id) => {
        try {
            // Retrieve the token from sessionStorage
            const staffToken = sessionStorage.getItem('staffToken');
            
            if (!staffToken) 
            {
                window.alert("You Do Not Have Permission to use this page. Please log in again.");
                navigate("/staffLogin");
                return;
            }

            const url = `https://localhost:3001/payment/deletePayment/${id}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${staffToken}`
                },
            });
    
            if (response.ok) {
                window.alert("The transaction has been deleted.");
                
                // Redirect to transactions verification portal after successful deletion
                navigate("/transactionVerificationPortal");
            } else {
                const errorData = await response.json();
                window.alert(`Failed to delete transaction: ${errorData.message}`);
                
                // Redirect even if there's an error during deletion
                navigate("/transactionVerificationPortal");
            }
        } catch (error) {
            console.error("Error deleting transaction:", error);
            window.alert("An error occurred while deleting the transaction.");
    
            // Redirect in case of an exception
            navigate("/transactionVerificationPortal");
        }
    };    

    return (
        <div>
            <br />
            <div className="detailcontainer">
                <div className="detailcolumn">
                    <div className="innerContent">
                        <button onClick={cancel} className="btn btn-primary">Back</button>
                        <br></br>
                    </div>
                    <h3>Confirm Your Payment</h3>
                    <div className="innerContent">
                        <p><strong>Transaction ID:</strong> {_id}</p> {/* Displaying the _id */}
                        <p><strong>Recipient Full Name:</strong> {form.cp_recipientFullName}</p>
                        <p><strong>Recipient Address:</strong> {form.cp_recipientAddress}</p>
                        <p><strong>Recipient City:</strong> {form.cp_recipientCity}</p>
                        <p><strong>Postal Code:</strong> {form.cp_recipientPostalCode}</p>
                        <p><strong>Country:</strong> {form.cp_recipientCountry}</p>
                        <p><strong>Bank Name:</strong> {form.cp_swiftBankName}</p>
                        <p><strong>SWIFT Code:</strong> {form.cp_swiftCode}</p>
                        <p><strong>International Bank Number:</strong> {form.cp_swiftIntBankNumber}</p>
                        <p><strong>Amount:</strong> {form.cp_amount}</p>
                        <p><strong>Currency:</strong> {form.cp_currency}</p>
                        <p><strong>Payment Reference:</strong> {form.cp_payReference}</p>
                    </div>

                    <button onClick={() => handleBothActions(_id)} className="btn btn-success">
                        Submit to SWIFT
                    </button>

                    {/* Button to deny the payment */}
                    <button
                        onClick={() => deletePayment(_id)}
                        className="btn btn-danger"
                        style={{ marginLeft: "10px" }}
                    >
                        Deny Payment
                    </button>
                </div>
            </div>
            <br />
        </div>
    );
}