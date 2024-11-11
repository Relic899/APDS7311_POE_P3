import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Transaction = (props) => (
    <tr>
        <td>{props.transaction.cp_recipientFullName}</td>
        <td>{props.transaction.cp_recipientAddress}</td>
        <td>{props.transaction.cp_recipientCity}</td>
        <td>{props.transaction.cp_recipientPostalCode}</td>
        <td>{props.transaction.cp_recipientCountry}</td>
        <td>{props.transaction.cp_swiftBankName}</td>
        <td>{props.transaction.cp_swiftCode}</td>
        <td>{props.transaction.cp_swiftIntBankNumber}</td>
        <td>{props.transaction.cp_amount}</td>
        <td>{props.transaction.cp_currency}</td>
        <td>{props.transaction.cp_payReference}</td>
        <td>
            <button
                className="btn btn-link"
                onClick={() => props.verifyTransaction(props.transaction)}
            >
                Verify
            </button>
        </td>
    </tr>
);


export default function TransactionVerificationPortal() {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    // Fetch transactions on component mount (No token authentication)
    useEffect(() => {
        async function fetchTransactions() {
            try {
                // Retrieve the token from sessionStorage
                const staffToken = sessionStorage.getItem('staffToken');
    
                // Check if the token exists before making the request
                if (!staffToken) {
                    window.alert("You Do not have Access to this page. Please log in again.");
                    navigate("/staffLogin");
                    return;
                }
    
                // Make the fetch request with the Authorization header
                const response = await fetch("https://localhost:3001/payment/getPayments", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${staffToken}`
                    }
                });
    
                // Check if the response is okay
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
    
                const data = await response.json();
                setTransactions(data);
    
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
                window.alert("Error fetching transactions. Please check your network.");
            }
        }
    
        fetchTransactions();
    }, [navigate]);    

    function verifyTransaction(transaction) {
        const form = {
            _id: transaction._id, // Include the unique _id
            cp_recipientFullName: transaction.cp_recipientFullName || "",
            cp_recipientAddress: transaction.cp_recipientAddress || "",
            cp_recipientCity: transaction.cp_recipientCity || "",
            cp_recipientPostalCode: transaction.cp_recipientPostalCode || "",
            cp_recipientCountry: transaction.cp_recipientCountry || "",
            cp_swiftBankName: transaction.cp_swiftBankName || "",
            cp_swiftCode: transaction.cp_swiftCode || "",
            cp_swiftIntBankNumber: transaction.cp_swiftIntBankNumber || "",
            cp_amount: transaction.cp_amount || "",
            cp_currency: transaction.cp_currency || "ZAR",
            cp_payReference: transaction.cp_payReference || "",
        };
    
        navigate("/paymentConfirmation", { state: form });
    }    

    // Render the list of transactions
    function renderTransactionList() {
        return transactions.map((transaction) => (
            <Transaction
                transaction={transaction}
                verifyTransaction={verifyTransaction}
                key={transaction._id}
            />
        ));
    }

    function logout() {
        sessionStorage.removeItem('staffToken');
        navigate("/staffLogin");
    }   

    return (
        <div className="container">
            <div className="innerContent">
                <br></br>
                <button onClick={logout} className="btn btn-primary">Logout</button>
                <br></br>
                <br></br>
            </div>
            <h3 className="header">Transaction Verification Portal</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Recipient Full Name</th>
                        <th>Recipient Address</th>
                        <th>Recipient City</th>
                        <th>Postal Code</th>
                        <th>Country</th>
                        <th>Bank Name</th>
                        <th>SWIFT Code</th>
                        <th>Int Bank Number</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Payment Reference</th>
                        <th>Verify</th>
                    </tr>
                </thead>
                <tbody>{renderTransactionList()}</tbody>
            </table>
        </div>
    );
}