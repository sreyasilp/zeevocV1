import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import {
    getAllBlogPosts,
    getAllServices,
    getAllOrders,
    createOrder,
    updateProfile,
    deleteBlogPost,
    deleteService,
    deleteOrder,
    createBlogPost,
    createService,
    updateBlogPost,
    updateService,
} from '../../api/index.js'; // Adjust the path as necessary

const MainContent = ({ selectedItem }) => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [columnsToShow, setColumnsToShow] = useState([]);

    useEffect(() => {
        fetchData();
    }, [selectedItem]);

    const fetchData = async () => {
        try {
            let response;
            switch (selectedItem) {
                case 'blogposts':
                    response = await getAllBlogPosts();
                    break;
                case 'services':
                    response = await getAllServices();
                    break;
                case 'orders':
                    response = await getAllOrders();
                    break;
                // Add more cases as needed for other items
                default:
                    response = { data: [] };
            }
            setData(response.data);
            if (response.data.length > 0) {
                setColumnsToShow(Object.keys(response.data[0]));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAdd = () => {
        setIsEditing(false);
        setFormData({});
        setShow(true);
    };

    const handleEdit = (item) => {
        setIsEditing(true);
        setFormData(item);
        setShow(true);
    };

    const handleDelete = async (id) => {
        try {
            switch (selectedItem) {
                case 'blogposts':
                    await deleteBlogPost(id);
                    break;
                case 'services':
                    await deleteService(id);
                    break;
                case 'orders':
                    await deleteOrder(id);
                    break;
                // Add more cases as needed for other items
                default:
                    break;
            }
            fetchData();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleSave = async () => {
        try {
            if (isEditing) {
                switch (selectedItem) {
                    case 'blogposts':
                        await updateBlogPost(formData._id, formData);
                        break;
                    case 'services':
                        await updateService(formData._id, formData);
                        break;
                    case 'orders':
                        await updateProfile(formData.id, formData);
                        break;
                    // Add more cases as needed for other items
                    default:
                        break;
                }
            } else {
                switch (selectedItem) {
                    case 'blogposts':
                        await createBlogPost(formData);
                        break;
                    case 'services':
                        await createService(formData);
                        break;
                    case 'orders':
                        await createOrder(formData);
                        break;
                    // Add more cases as needed for other items
                    default:
                        break;
                }
            }
            fetchData();
            setShow(false);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const renderTableHeader = () => {
        return columnsToShow.map((key) => (
            <th key={key}>{key.toUpperCase()}</th>
        ));
    };

    const renderTableRows = () => {
        return data.map((item, index) => (
            <tr key={item._id || item.id}>
                <td>{index + 1}</td>
                {columnsToShow.map((key) => (
                    <td key={key}>{item[key]}</td>
                ))}
                <td>
                    <Button variant="warning" className="me-2" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(item._id || item.id)}>Delete</Button>
                </td>
            </tr>
        ));
    };

    return (
        <div className="main-content p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>{selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1)}</h1>
                <Button variant="primary" onClick={handleAdd}>Add New</Button>
            </div>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        {renderTableHeader()}
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </Table>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Item' : 'Add Item'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {columnsToShow.map((key) => (
                            <Form.Group controlId={`form${key}`} key={key}>
                                <Form.Label>{key.toUpperCase()}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData[key] || ''}
                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                />
                            </Form.Group>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MainContent;
