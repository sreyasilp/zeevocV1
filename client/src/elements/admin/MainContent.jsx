import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa'; // Importing icons
import {
    getAllBlogPosts,
    getAllServices,
    getAllOrders,
    createOrder,
    updateProfile,
    getAllExtensions
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
                case 'extensions':
                    response = await getAllExtensions();
                    break;
                default:
                    response = { data: [] };
            }
            setData(response.data);
            if (response.data.length > 0) {
                setColumnsToShow(Object.keys(response.data[0]).slice(0, 4)); // Show only first 4 columns
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
                case 'services':
                    // await deleteService(id);
                    break;
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
                    case 'orders':
                        await updateProfile(formData.id, formData);
                        break;
                    default:
                        break;
                }
            } else {
                switch (selectedItem) {
                    case 'orders':
                        await createOrder(formData);
                        break;
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
            <tr key={item.id}>
                <td>{index + 1}</td>
                {columnsToShow.map((key) => (
                    <td key={key}>{typeof item[key] === 'object' ? JSON.stringify(item[key]) : item[key]}</td>
                ))}
                <td>
                    <Button variant="warning" className="me-2" onClick={() => handleEdit(item)}>
                        <FaEdit />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(item.id)}>
                        <FaTrashAlt />
                    </Button>
                </td>
            </tr>
        ));
    };

    return (
        <div className="admin-main-content p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>{selectedItem}</h4>
                <Button variant="primary" onClick={handleAdd}>
                    <FaPlus />
                </Button>
            </div>
            <div className="admin-table-container">
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
            </div>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Item' : 'Add Item'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {Object.keys(formData).map((key) => (
                            <Form.Group controlId={`form${key}`} key={key}>
                                <Form.Label>{key.toUpperCase()}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData[key]}
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
