import React, {useContext, useEffect } from "react";
import { Table, Button, Typography, Avatar } from "antd";
import {AiFillEdit, AiFillDelete, AiOutlineUserAdd} from "react-icons/ai";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import '../components/styles/App.css';

const ShowTable = () => {
    const {Title} = Typography;
    const {clientes, getclient} = useContext(AppContext);
    const { setidClientDelete } = useContext(AppContext);
    const { setClientEdit, setIsEditing } = useContext(AppContext);  

    

    const navigate = useNavigate();


    useEffect(() => {
        setIsEditing(false);
        getclient();
    }, []);
    
    useEffect (() => {  
        setIsEditing(false);
    }, [setIsEditing]);
    const columns = [
        {
            title: ' First Name',
            dataIndex: 'first_name',
            key: 'name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <Avatar src={image} size={64} shape="square" />
            ),
        },
        {
            title: 'Edit',
            key: 'edit',
            render: (text, record) => (
                <Button type="primary" onClick={() => handleEdit(record)}><AiFillEdit /></Button>
            ),
            
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <Button type="primary" danger onClick={() => handleDelete(record)}><AiFillDelete /></Button>
            ),
        }
        
    ];

    const handleEdit = (record) => {
        setIsEditing(true);
        setClientEdit(record);
        //console.log('edit 1',record);
        navigate('/create');
        console.log('Editado');
    };

    const handleDelete = (record) => {
        setidClientDelete(record);
        //console.log(record);
        navigate('/delete');
    };

    const handleAdd = (key) => {
        setIsEditing(false);
        navigate('/create');
    };

    return (
        <div className="m-5" id="table">
            <Title level={2}>Customers</Title>
            <Button type="primary" onClick={handleAdd}>
                <span>
                    <AiOutlineUserAdd />
                </span>
                Add client
            </Button>
            <Table 
                dataSource={clientes} 
                columns={columns} 
                pagination={false}
                rowKey="id"
            />
        </div>
    );
};

export default ShowTable;