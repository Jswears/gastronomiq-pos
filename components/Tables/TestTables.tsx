'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Category = {
    category_id: number;
    name: string;
    description: string;
};
type MenuItem = {
    menu_item_id: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
};
type OrderItem = {
    order_id: number;
    menu_item_id: number;
    quantity: number;
    unit_price: number;
};

const TestTable = ({ tableId }: { tableId: number }) => {
    const [categories, setCategories] = useState<Category[] | undefined>();
    const [menuItems, setMenuItems] = useState<MenuItem[] | undefined>();
    const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[] | undefined>();
    const [orderId, setOrderId] = useState(null);
    const [orderItems, setOrderItems] = useState<OrderItem[] | undefined>([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/menu-items`);
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const initOrder = async () => {
        try {
            const getOrdersResponse = await axios.get(`${BASE_URL}/tables/${tableId}/orders`);
            const orders = getOrdersResponse.data;
            console.log('Order:', orders);

            if (orders.length > 1) {
                const openOrder = orders.find((order: any) => order.status === 'Open');
                if (openOrder) {
                    setOrderId(openOrder.order_id);
                } else {
                    const createOrderResponse = await axios.post(`${BASE_URL}/tables/${tableId}/orders`, {
                        status: 'Open',
                        employee_id: 1,
                    });
                    console.log('Order created:', createOrderResponse.data);
                    setOrderId(createOrderResponse.data.order_id);
                }
            } else if (orders.length === 0 || orders[0].status === 'Closed') {
                const createOrderResponse = await axios.post(`${BASE_URL}/tables/${tableId}/orders`, {
                    status: 'Open',
                    employee_id: 1,
                });
                console.log('Order created:', createOrderResponse.data);
                setOrderId(createOrderResponse.data.order_id);
            } else if (orders[0].status === 'Open') {
                setOrderId(orders[0].order_id);
            }
            console.log(orderId);
        } catch (error) {
            console.error('Error initializing order:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchMenuItems();
    }, []);

    useEffect(() => {
        if (tableId) {
            initOrder();
        }
    }, [tableId]);


    return (
        <div className="p-5 font-sans">
            <p>This is the orderId {orderId}</p>
            <h1 className="text-2xl text-gray-800">Table {tableId}</h1>
            <h2 className="text-xl text-gray-600">Menu</h2>
            <ul className="list-none p-0">
                {menuItems?.map((menuItem) => (
                    <li key={menuItem.menu_item_id} className="mb-4 border-b border-gray-300 pb-2">
                        <p>Menu item id {menuItem.menu_item_id}</p>
                        <h3 className="m-0 mb-1 text-lg text-gray-900">{menuItem.name}</h3>
                        <p className="m-0 mb-1 text-gray-500">{menuItem.description}</p>
                        <p className="m-0 text-black">${menuItem.price}</p>
                    </li>
                ))}
            </ul>
            {/* <div>
                <h2>Order Items:</h2>
                <ul>
                    {orderItems.map((orderItem: any) => (
                        <li key={orderItem.order_item_id}>
                            <p>{orderItem.menu_item_id}</p>
                            <p>{orderItem.quantity}</p>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
}

export default TestTable;