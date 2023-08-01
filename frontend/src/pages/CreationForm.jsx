import React, { useContext, useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Upload, message } from 'antd';
import { postDataRequest, updateClientById } from '../api/dataEntry.js';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { AppContext } from '../context/AppContext';
import { set, useForm } from 'react-hook-form';

const CreationForm = () => {
  const { Title } = Typography;
  const { ClientEdit, setIsEditing, isEditing } = useContext(AppContext);
  const navigate = useNavigate();
  const { handleSubmit, register, setValue } = useForm();
  //const [defaultImageList, setDefaultImageList] = useState([]);
  const [cliente, setCliente] = useState({
    first_name: '',
    last_name: '',
    age: '',
    address: '',
    image: '',
    newImage: null
    })


  //paraeditar
  useEffect(() => {
    if (isEditing && ClientEdit) {
      setCliente({
        first_name: ClientEdit.first_name,
        last_name: ClientEdit.last_name,
        age: ClientEdit.age,
        address: ClientEdit.address,
        image: ClientEdit.image,
        newImage: null
      });
    }
  }, []);

  const handleImageChange = (info) => {
    const fileList = info.fileList;
    // Guardar la imagen seleccionada en el estado
    // console.log('en handleImageChange', fileList);
    if (isEditing) {
      setCliente({
        ...cliente,
        newImage: fileList
      })
      //console.log('siiiiu filelist', fileList[0].originFileObj)
    }
    setValue('image', fileList);
    
  };

  const onFinish = async (values) => {
    if (!isEditing) {
      try {
        const formData = new FormData();
        formData.append('first_name', cliente.first_name);
        formData.append('last_name', cliente.last_name);
        formData.append('age', cliente.age);
        formData.append('address', cliente.address);
        if (values.image && values.image.length > 0) {
          //console.log('si hay imagen siuuu', values.image[0].originFileObj)

          formData.append('image', values.image[0].originFileObj);
          console.log(formData);
        } else {
          console.log('no hay imagen')
          message.error('Please select an image');
          return
        }
        // console.log('formData en creacion', formData);
        const response = await postDataRequest(formData);
        navigate('/');
        console.log('Success:', response);
      } catch (error) {
        console.log('Error:', error);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('first_name', cliente.first_name);
        formData.append('last_name', cliente.last_name);
        formData.append('age', cliente.age);
        formData.append('address', cliente.address);
        formData.append('image', cliente.image);
        if (values.image && values.image.length > 0) {
          formData.append('newImage', values.image[0].originFileObj);
          //console.log('values.image', values.image);

          setCliente({
            ...cliente,
            newImage: values.image[0].originFileObj
          });



        } else {
          //formData.append('newImage', null);
        }

        console.log('cliente en edicion formData', formData);
        // console.log('cliente en edicion', cliente);

        const response = await updateClientById(ClientEdit.id, formData);
        setIsEditing(false);
        navigate('/');
        console.log('Success EDIT:', response);
      } catch (error) {
        console.log('Error EDIT:', error.response.data);
      }
    }
  };

  return (
    <div className="m-5" id="table">
      <Title level={2}>Create Customer</Title>
      <Form onFinish={handleSubmit(onFinish)}>
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
              message: 'Please input your First Name!',
            },
            
          ]}
          initialValue={isEditing ? ClientEdit.first_name : ''}
        >
          <Input 
            onChange={(e) => {
                setCliente({
                    ...cliente,
                    first_name: e.target.value
                })
            }} 
          />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[
            {
              required: true,
              message: 'Please input your Last Name!',
            },
          ]}
          initialValue={isEditing ? ClientEdit.last_name : ''}
        >
          <Input  onChange={(e) => {
                setCliente({
                    ...cliente,
                    last_name: e.target.value
                })
            }}
          />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              message: 'Please input your Age!',
            },
          ]}
          initialValue={isEditing ? ClientEdit.age : ''}
        >
          <Input 
            onChange={(e) => {
                setCliente({
                    ...cliente,
                    age: e.target.value
                })
            }} 
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: 'Please input your Address!',
            },
          ]}
          initialValue={isEditing ? ClientEdit.address : ''}
        >
          <Input 
            onChange={(e) => {
                setCliente({
                    ...cliente,
                    address: e.target.value
                })
            }} 
          />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <Upload
            name="image"
            accept="image/*"
            listType="picture"
            beforeUpload={() => false} // Evitar la subida automática del archivo
            onChange={handleImageChange}
            //fileList={defaultImageList}

            //en edicion

            //initialValue={isEditing ? ClientEdit.image: ''}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type={isEditing ? 'default' : 'primary'}
            htmlType="submit"
            className={isEditing ? 'edit-button' : ''}
            style={{
              backgroundColor: isEditing ? 'green' : '',
              color: 'white',
            }}
          >
            {isEditing ? 'Edit' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreationForm;































//se guarda la imagen pero no los demas campos
// import React, { useContext } from 'react';
// import { Form, Input, Button, Typography, Upload } from 'antd';
// import { postDataRequest, updateClientById } from '../api/dataEntry.js';
// import { useNavigate } from 'react-router-dom';
// import { UploadOutlined } from '@ant-design/icons';
// import { AppContext } from '../context/AppContext';
// import { useForm } from 'react-hook-form';

// const CreationForm = () => {
//   const { Title } = Typography;
//   const { ClientEdit, setIsEditing, isEditing } = useContext(AppContext);
//   const navigate = useNavigate();
//   const { handleSubmit, register, setValue } = useForm();

//   const handleImageChange = (info) => {
//     const fileList = info.fileList;
//     // Guardar la imagen seleccionada en el estado
//     console.log('en handleImageChange', fileList);
//     setValue('image', fileList);
//   };

//   const onFinish = async (values) => {
//     if (!isEditing) {
//       console.log('datos', values);
//       try {
//         const formData = new FormData();
//         formData.append('first_name', values.first_name);
//         formData.append('last_name', values.last_name);
//         formData.append('age', values.age);
//         formData.append('address', values.address);
//         console.log('imagen', values.image[0].originFileObj);
//         // Agregar la imagen al formData si está seleccionada
//         if (values.image && values.image.length > 0) {
//           formData.append('image', values.image[0].originFileObj);
//         }
//         const response = await postDataRequest(formData);
//         navigate('/');
//         console.log('Success:', response);
//       } catch (error) {
//         console.log('Error:', error);
//       }
//     } else {
//       try {
//         const response = await updateClientById(ClientEdit.id, values);
//         setIsEditing(false);
//         navigate('/');
//         console.log('Success EDIT:', response);
//       } catch (error) {
//         console.log('Error EDIT:', error);
//       }
//     }
//   };

//   return (
//     <div className="m-5" id="table">
//       <Title level={2}>Create Customer</Title>
//       <Form onFinish={handleSubmit(onFinish)}>
//         <Form.Item
//           label="First Name"
//           name="first_name"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your First Name!',
//             },
//           ]}
//           initialValue={isEditing ? ClientEdit.first_name : ''}
//         >
//           <Input {...register('first_name')} />
//         </Form.Item>
//         <Form.Item
//           label="Last Name"
//           name="last_name"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your Last Name!',
//             },
//           ]}
//           initialValue={isEditing ? ClientEdit.last_name : ''}
//         >
//           <Input {...register('last_name')} />
//         </Form.Item>
//         <Form.Item
//           label="Age"
//           name="age"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your Age!',
//             },
//           ]}
//           initialValue={isEditing ? ClientEdit.age : ''}
//         >
//           <Input {...register('age')} />
//         </Form.Item>
//         <Form.Item
//           label="Address"
//           name="address"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your Address!',
//             },
//           ]}
//           initialValue={isEditing ? ClientEdit.address : ''}
//         >
//           <Input {...register('address')} />
//         </Form.Item>
//         <Form.Item label="Image" name="image">
//           <Upload
//             name="image"
//             accept="image/*"
//             listType="picture"
//             beforeUpload={() => false} // Evitar la subida automática del archivo
//             onChange={handleImageChange}
//           >
//             <Button icon={<UploadOutlined />}>Click to upload</Button>
//           </Upload>
//         </Form.Item>
//         <Form.Item>
//           <Button
//             type={isEditing ? 'default' : 'primary'}
//             htmlType="submit"
//             className={isEditing ? 'edit-button' : ''}
//             style={{
//               backgroundColor: isEditing ? 'green' : '',
//               color: 'white',
//             }}
//           >
//             {isEditing ? 'Edit' : 'Create'}
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default CreationForm;














//copia valida sin la imagen
//import axios from 'axios';
// import React, { useContext, useState } from 'react';
// import { Form, Input, Button, Typography, Upload } from 'antd';
// import { postDataRequest, updateClientById } from '../api/dataEntry.js';
// import { useNavigate } from "react-router-dom";
// import { UploadOutlined } from "@ant-design/icons";
// import { AppContext } from "../context/AppContext";


// const CreationForm = () => {

//     const {Title} = Typography;

//     const { ClientEdit, setIsEditing, isEditing } = useContext(AppContext);

//     const navigate = useNavigate();


//     const [selectedImage, setSelectedImage] = useState(null);

//     const handleImageChange = (info) => {
//         console.log('en imageChange', info.file);
//         // if (info.file.status === 'done') {
//         // // La imagen se ha cargado exitosamente
//         // setSelectedImage(info.file.originFileObj);
//         // }
//         if (info.file.status === 'done' && info.file.originFileObj) {
//             setSelectedImage(info.file.originFileObj);
//         }
//     };





//     const onFinish = async (values) => {
//         if (!isEditing) {
//             console.log('hola', values);
//             try {
//                 const formData = new FormData();
//                 formData.append('first_name', values.first_name);
//                 formData.append('last_name', values.last_name);
//                 formData.append('age', values.age);
//                 formData.append('address', values.address);
//                 console.log('en onfinish', selectedImage);
//                 if (selectedImage) {
//                     formData.append('image', selectedImage);
//                 }
//                 const response = await postDataRequest(formData);
//                 // const response = await axios.post('/client', formData, {
//                 //     headers: {
//                 //       'Content-Type': 'multipart/form-data'
//                 //     }
//                 //   });
//                 navigate('/');
//                 console.log('Success:', response);
//             } catch (error) {
//                 // console.log(values);
//                 console.log('Error:', error);
//             }
//         } else {
//             try {
//                 // console.log('Datos a editar: ', values);
//                 // console.log('cliente a editar',ClientEdit);      
//                 const response = await updateClientById(ClientEdit.id, values);
//                 setIsEditing(false);
//                 navigate('/');
//                 console.log('Success EDIT:', response);
//             } catch (error) {
//                 console.log(values);
//                 console.log('Error EDIT:', error);
//             }
//         }
//     };


//     // useEffect(() => {
//     //     setIsEditing(false); // Restablece el estado del cliente editado a null
//     // }, [setIsEditing]);

//     return (
//         <div className="m-5" id="table">
//             <Title level={2}>Create Customer</Title>
//             <Form onFinish={onFinish} method='POST' action="/client" encType="multipart/form-data">
//                 <Form.Item
//                     label="First Name"
//                     name="first_name"
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Please input your First Name!',
//                         },
//                     ]}
//                     // initialValue={ClientEdit?.first_name} // Utiliza el valor inicial del cliente seleccionado
//                     initialValue={isEditing? ClientEdit.first_name: ''} // Utiliza el valor inicial del cliente seleccionado
//                 >
//                     <Input />
//                 </Form.Item>
//                 <Form.Item
//                     label="Last Name"
//                     name="last_name"
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Please input your Last Name!',
//                         },
//                     ]}
//                     // initialValue={ClientEdit?.last_name} // Utiliza el valor inicial del cliente seleccionado
//                     initialValue={isEditing? ClientEdit.last_name: ''} // Utiliza el valor inicial del cliente seleccionado
//                 >
//                     <Input />
//                 </Form.Item>
//                 <Form.Item
//                     label="Age"
//                     name="age"
//                     rules={[
//                         {   
//                             required: true,
//                             message: 'Please input your Age!',
//                         }, 
//                     ]}
//                     // initialValue={ClientEdit?.age // Utiliza el valor inicial del cliente seleccionado
//                     initialValue={isEditing? ClientEdit.age: ''} // Utiliza el valor inicial del cliente seleccionado
                        
//                 >
//                     <Input />
//                 </Form.Item>
//                 <Form.Item
//                     label="Address"
//                     name="address"
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Please input your Address!',
//                         },
//                     ]}
//                     // initialValue={ClientEdit?.address} // Utiliza el valor inicial del cliente seleccionado
//                     initialValue={isEditing? ClientEdit.address: ''} // Utiliza el valor inicial del cliente seleccionado
//                 >
//                     <Input />
//                 </Form.Item>
//                 <Form.Item
//                     label="Image"
//                     name="image"
//                     valuePropName="fileList"
//                     getValueFromEvent={(e) => {
//                         if (Array.isArray(e)) {
//                         return e;
//                         }
//                         return e && e.fileList;
//                     }}

//                 >           
//                 </Form.Item>
//                     <Upload name="image"
//                      accept="image/*"
//                     listType="picture"
//                     onChange={handleImageChange}
//                     >
//                         <Button icon={<UploadOutlined />}>Click to upload</Button>
//                     </Upload>
//                      {/* <input required type="file" name='image' accept="image/*" /> */}
//                 <Form.Item>
//                     <Button
//                         type={isEditing ? 'default' : 'primary'}
//                         htmlType="submit"
//                         className={isEditing ? 'edit-button' : ''}
//                         style={{ backgroundColor: isEditing ? 'green' : '',
//                         color: 'white',}} // Cambia el color del botón cuando está en modo de edición
//                     >
//                         {isEditing ? 'Edit' : 'Create'}
//                     </Button>

//                 </Form.Item>
//             </Form>
//         </div>
//     );
// };

// export default CreationForm;



































// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { postDataRequest, updateClientById } from '../api/dataEntry.js';
// import { AppContext } from '../context/AppContext';

// const CreationForm = () => {
//   const { ClientEdit, setIsEditing, isEditing } = useContext(AppContext);
//   const navigate = useNavigate();
//   const { register, handleSubmit, setValue } = useForm();

//   useEffect(() => {
//     if (isEditing && ClientEdit) {
//       // Establecer los valores iniciales del formulario
//       setValue('first_name', ClientEdit.first_name);
//       setValue('last_name', ClientEdit.last_name);
//       setValue('age', ClientEdit.age);
//       setValue('address', ClientEdit.address);
//     }
//   }, [isEditing, ClientEdit, setValue]);

//   const onSubmit = async (values) => {
//     if (!isEditing) {
//       try {
//         const response = await postDataRequest(values);
//         navigate('/');
//         console.log('Success:', response);
//       } catch (error) {
//         console.log('Error:', error);
//       }
//     } else {
//       try {
//         const response = await updateClientById(ClientEdit.id, values);
//         setIsEditing(false);
//         navigate('/');
//         console.log('Success EDIT:', response);
//       } catch (error) {
//         console.log('Error EDIT:', error);
//       }
//     }
//   };

//   return (
//     <div className="m-5" id="table">
//       <h2>Create Customer</h2>
//       <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" method='POST'>
//         <div>
//           <label htmlFor="first_name">First Name:</label>
//           <input {...register('first_name', { required: true })} />
//         </div>
//         <div>
//           <label htmlFor="last_name">Last Name:</label>
//           <input {...register('last_name', { required: true })} />
//         </div>
//         <div>
//           <label htmlFor="age">Age:</label>
//           <input {...register('age', { required: true })} />
//         </div>
//         <div>
//           <label htmlFor="address">Address:</label>
//           <input {...register('address', { required: true })} />
//         </div>
//         <div>
//           <label htmlFor="image">Image:</label>
//           <input type="file" name="image" accept="image/*" {...register('image')} />
//         </div>
//         <div>
//           <button type="submit">{isEditing ? 'Edit' : 'Create'}</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreationForm;

// import React, { useContext, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { postDataRequest, updateClientById } from '../api/dataEntry.js';
// import { AppContext } from '../context/AppContext';

// const CreationForm = () => {
//   const { ClientEdit, setIsEditing, isEditing } = useContext(AppContext);
//   const navigate = useNavigate();
//   const formRef = useRef();

//   useEffect(() => {
//     if (isEditing && ClientEdit) {
//       // Establecer los valores iniciales del formulario
//       formRef.current['first_name'].value = ClientEdit.first_name;
//       formRef.current['last_name'].value = ClientEdit.last_name;
//       formRef.current['age'].value = ClientEdit.age;
//       formRef.current['address'].value = ClientEdit.address;
//     }
//   }, [isEditing, ClientEdit]);

//   const onSubmit = async (event) => {
//     event.preventDefault();

//     const values = {
//       first_name: formRef.current['first_name'].value,
//       last_name: formRef.current['last_name'].value,
//       age: formRef.current['age'].value,
//       address: formRef.current['address'].value,
//       image: formRef.current['image'].files[0],
//     };
//     console.log(values.image);
//     if (!isEditing) {
//       try {
//         const response = await postDataRequest(values);
//         navigate('/');
//         console.log('Success:', response);
//       } catch (error) {
//         console.log('Error:', error);
//       }
//     } else {
//       try {
//         const response = await updateClientById(ClientEdit.id, values);
//         setIsEditing(false);
//         navigate('/');
//         console.log('Success EDIT:', response);
//       } catch (error) {
//         console.log('Error EDIT:', error);
//       }
//     }
//   };

//   return (
//     <div className="m-5" id="table">
//       <h2>Create Customer</h2>
//       <form method='POST' action="/client" onSubmit={onSubmit} encType="multipart/form-data" ref={formRef}>
//         <div>
//           <label htmlFor="first_name">First Name:</label>
//           <input type="text" name="first_name" required />
//         </div>
//         <div>
//           <label htmlFor="last_name">Last Name:</label>
//           <input type="text" name="last_name" required />
//         </div>
//         <div>
//           <label htmlFor="age">Age:</label>
//           <input type="text" name="age" required />
//         </div>
//         <div>
//           <label htmlFor="address">Address:</label>
//           <input type="text" name="address" required />
//         </div>
//         <div>
//           <label htmlFor="image">Image:</label>
//           <input type="file" name="image" accept="image/*" />
//         </div>
//         <div>
//           <button type="submit">{isEditing ? 'Edit' : 'Create'}</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreationForm;

