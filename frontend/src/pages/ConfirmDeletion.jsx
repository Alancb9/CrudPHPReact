import React, { useContext } from 'react';
import { Table ,Button, Typography, Avatar } from 'antd';
import {AiTwotoneDelete} from "react-icons/ai";
import { AppContext } from "../context/AppContext";
import { deleteClientById } from '../api/dataEntry.js';
import { useNavigate } from "react-router-dom";




const ConfirmDeletion = () => {

    const {Title} = Typography;
    const {idClientDelete} = useContext(AppContext);

    const navigate = useNavigate();

    
    // useEffect(() => {
    //     getclientById();
    // }, [getclientById]);
    // const dataSource = [
    //     {
    //         key: '1',
    //         first_name: 'First name to delete',
    //         last_name: 'Last name to delete',
    //         age: 'Age to delete',
    //         address: 'Address to delete',
    //     },
    // ];

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
        }
    ];

    const handleDelete = async () => {
        try {
          await deleteClientById(idClientDelete.id);
          console.log('Eliminado');
          navigate('/client');
        } catch (error) {
          console.log(error);
        }
      };
      
    

    return (
        <div className="m-5" id="table">
            <Title level={2}>Customers</Title>
            
            <Table 
                dataSource={[idClientDelete]} 
                columns={columns} 
                pagination={false}
            />
            <Button type="primary" danger onClick={handleDelete}>
                <span>
                   <AiTwotoneDelete />
                </span>
                Delete client
            </Button>
        </div>
    );
};

export default ConfirmDeletion;