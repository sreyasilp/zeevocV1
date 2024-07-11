import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { Container, Row, Col } from 'react-bootstrap';

const AdminBlock = () => {
    const [selectedItem, setSelectedItem] = useState('blogposts');

    return (
        <Container fluid>
            <Row>
                <Col xs={2} className="p-0">
                    <Sidebar onSelect={setSelectedItem} />
                </Col>
                <Col xs={10}>
                    <MainContent selectedItem={selectedItem} />
                </Col>
            </Row>
        </Container>
    );
};

export default AdminBlock;
