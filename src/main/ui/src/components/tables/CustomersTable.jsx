import React, {useState, useEffect} from 'react';
import apiClient from '../api/apiClient';
import GenericTable from "./GenericTable"
import CustomerDialog from "../dialogs/CustomerDialog";

const CustomersTable = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editCustomer, setEditCustomer] = useState(null);

    // Fetch customers from backend
    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const res = await apiClient.get("/customers");
                const normalized = res.data.map(c => ({
                    id: c.customerId,
                    name: c.name,
                    city: c.city
                }));
                setRows(normalized);
            } catch (e) {
                console.error("Error fetching customers", e);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    // Unified save handler for both add (POST) and update (PUT)
    const handleSaveCustomer = async (customer) => {
        try {
            let response;
            if (customer.id) {
                // Update existing customer
                response = await apiClient.put(
                    `/customers/${customer.id}`,
                    { name: customer.name, city: customer.city }
                );
            } else {
                // Add new customer
                response = await apiClient.post(
                    "/customers",
                    { name: customer.name, city: customer.city }
                );
            }

            const normalized = {
                id: response.data.customerId,
                name: response.data.name,
                city: response.data.city
            };

            setRows(prev => {
                const exists = prev.find(r => r.id === normalized.id);
                if (exists) {
                    // Update row
                    return prev.map(r => r.id === normalized.id ? normalized : r);
                } else {
                    // Add new row
                    return [...prev, normalized];
                }
            });
        } catch (error) {
            console.error("Error saving customer", error);
        } finally {
            setOpenDialog(false);
            setEditCustomer(null);
        }
    };

    const handleEditCustomer = (customer) => {
        setEditCustomer(customer);
        setOpenDialog(true);
    };

    const handleDeleteCustomer = async (id) => {
        try {
            await apiClient.delete(`/customers/${id}`);
            setRows(prev => prev.filter(r => r.id !== id));
        } catch (error) {
            console.error("Error deleting customer", error);
        }
    };

    return (
        <>
            <GenericTable
                rows={rows}
                columns={[
                    { field: "id", headerName: "ID", width: 70 },
                    { field: "name", headerName: "Name", width: 200 },
                    { field: "city", headerName: "City", width: 250 }
                ]}
                loading={loading}
                onAddNew={() => { setEditCustomer(null); setOpenDialog(true); }}
                onEdit={handleEditCustomer}
                onDelete={handleDeleteCustomer} // DELETE by ID from the dialog
                entityName="Customer"
            />

            <CustomerDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSave={handleSaveCustomer}
                initialData={editCustomer}
            />
        </>
    );
};

export default CustomersTable;