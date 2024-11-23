import axios from "axios";
import React, { useEffect, useState } from "react";
import { orderURL } from "../../components/assets/constants/Urls/Url";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const getLocalOrders = () => {
        const ordersKey = "orderData";
        return JSON.parse(localStorage.getItem(ordersKey)) || [];
    };

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            const userId = JSON.parse(localStorage.getItem("id"));

            try {
                if (userId) {
                    // Fetch orders from the backend for authenticated users
                    const response = await axios.get(`${orderURL}/${userId}`);
                    setOrders(response.data || []);
                } else {
                    // Fetch orders from localStorage for unauthenticated users
                    const localOrders = getLocalOrders();
                    setOrders(localOrders);
                }
            } catch (error) {
                setError("Failed to fetch orders. Please try again later.");
                //console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Your Orders</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div style={{ color: "red" }}>{error}</div>
            ) : orders.length > 0 ? (
                <div>
                    {orders.map((order) => (
                        <div
                            className="card mb-3"
                            key={order.order_number}
                            onClick={() => navigate(`/order-details/${order.order_number}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="card-body">
                                <h5 className="card-title">Order #{order.order_number}</h5>
                                <p className="card-text">
                                    <strong>Status:</strong> {order.status}
                                </p>
                                <p className="card-text">
                                    <strong>Total:</strong> ${order.total_amount.toFixed(2)}
                                </p>
                                <p className="card-text">
                                    <strong>Order Date:</strong>{" "}
                                    {new Date(order.order_date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no orders.</p>
            )}
        </div>
    );
};

export default OrderPage;
