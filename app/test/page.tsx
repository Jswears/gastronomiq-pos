'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Employee = {
    employee_id: number;
    first_name: string;
    last_name: string;
    role: string;
};
type Category = {
    category_id: number;
    name: string;
    description: string;
}
type MenuItem = {
    menu_item_id: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
}
type RestaurantTable = {
    table_id: number;
    table_number: number;
    seats: number;
    location: string;
}

const TestPage = () => {
    const [employees, setEmployees] = useState<Employee[] | undefined>();
    const [categories, setCategories] = useState<Category[] | undefined>();
    const [menuItems, setMenuItems] = useState<MenuItem[] | undefined>();
    const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[] | undefined>();
    const [restaurantTables, setRestaurantTables] = useState<RestaurantTable[] | undefined>();

    const router = useRouter();

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/employees`);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

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

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = parseInt(event.target.value);
        if (categoryId === 0) {
            setFilteredMenuItems(menuItems);
        } else {
            const filteredItems = menuItems?.filter((item) => item.category_id === categoryId);
            setFilteredMenuItems(filteredItems);
        }
    };

    const fetchTables = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tables`);
            setRestaurantTables(response.data);
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    }

    const openOrder = async (tableId: number, employeeId: number) => {
        try {
            const response = await axios.post(`${BASE_URL}/tables/${tableId}/orders`, {
                employee_id: employeeId,
                status: 'Open'
            });
            console.log('Order opened:', response.data);
        } catch (error) {
            console.error('Error opening order:', error);
        }
    };

    const handleTableClick = (tableId: number) => {
        console.log(`Table ${tableId} clicked`);
        router.push(`/test/${tableId}`);
    };

    return (
        <div className="p-4">
            <div className="mb-8">
                <button className="cursor-pointer border-2 p-2 rounded-md mb-4" onClick={fetchEmployees}>Fetch Employees</button>
                <h2 className="text-xl font-bold mb-4">Employees</h2>
                {employees && (
                    employees.map((employee: Employee) => (
                        <div key={employee.employee_id} className="border p-2 my-2 rounded-md shadow-md">
                            <p className="font-bold">{employee.first_name} {employee.last_name}</p>
                            <p className="text-gray-600">{employee.role}</p>
                        </div>
                    ))
                )}
            </div>
            <div className="mb-8">
                <button className="cursor-pointer border-2 p-2 rounded-md mb-4" onClick={fetchCategories}>Fetch Categories</button>
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                {categories && (
                    categories.map((category: Category) => (
                        <div key={category.category_id} className="border p-2 my-2 rounded-md shadow-md">
                            <p className="font-bold">{category.name}</p>
                            <p className="text-gray-600">{category.description}</p>
                        </div>
                    ))
                )}
            </div>
            <div className="mb-8">
                <button className="cursor-pointer border-2 p-2 rounded-md mb-4" onClick={fetchMenuItems}>Fetch Menu Items</button>
                <h2 className="text-xl font-bold mb-4">Menu Items</h2>
                {menuItems && (
                    menuItems.map((menuItem: MenuItem) => (
                        <div key={menuItem.menu_item_id} className="border p-2 my-2 rounded-md shadow-md">
                            <p className="font-bold">{menuItem.name}</p>
                            <p className="text-gray-600">{menuItem.description}</p>
                            <p className="text-gray-600">Price: {menuItem.price}</p>
                        </div>
                    ))
                )}
                <h2 className="text-xl font-bold mb-4">Filter by category</h2>
                <select className="border p-2 rounded-md mb-4" onChange={handleFilterChange}>
                    <option value="0">All</option>
                    {categories && (
                        categories.map((category: Category) => (
                            <option key={category.category_id} value={category.category_id}>{category.name}</option>
                        ))
                    )}
                </select>
                <h2 className="text-xl font-bold mb-4">Filtered Items</h2>
                {filteredMenuItems && (
                    filteredMenuItems.map((menuItem: MenuItem) => (
                        <div key={menuItem.menu_item_id} className="border p-2 my-2 rounded-md shadow-md">
                            <p className="font-bold">{menuItem.name}</p>
                            <p className="text-gray-600">{menuItem.description}</p>
                            <p className="text-gray-600">Price: {menuItem.price}</p>
                        </div>
                    ))
                )}
            </div>
            <div className="mb-8">
                <button className="cursor-pointer border-2 p-2 rounded-md mb-4" onClick={fetchTables}>Fetch Tables</button>
                <h2 className="text-xl font-bold mb-4">Tables</h2>
                {restaurantTables && (
                    restaurantTables.map((table: RestaurantTable) => (
                        <div onClick={() => handleTableClick(table.table_id)} key={table.table_id} className="border p-2 my-2 rounded-md shadow-md cursor-pointer">
                            <p className="font-bold">Table {table.table_number}</p>
                            <p className="text-gray-600">Seats: {table.seats}</p>
                            <p className="text-gray-600">Location: {table.location}</p>
                        </div>
                    ))
                )}
            </div>
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Orders</h2>
            </div>
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Order-items</h2>
            </div>
        </div>
    );
}

export default TestPage;
