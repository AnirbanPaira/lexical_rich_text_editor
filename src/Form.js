import React, { useState } from 'react';
import Editor from './Editor/Editor';
import axios from 'axios';
import { toast } from 'react-toastify';

function Form() {
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState('');
  const [topic,setTopic] = useState('');
  const [topicImage,setTopicImage] =useState(null);

  const handleHtmlChange = (newHtmlContent) => {
    setDesc(newHtmlContent);  
  };

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'email') setEmail(value);
    if (name === 'designation') setDesignation(value);
    if (name === 'name') setName(value);
    if(name ==='topic')  setTopic(value);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      console.log('fiele',file);
      
      setImage(file);
      setImagePreview(file);
    }
  };

  const handleTopicImageChange=(e)=>{
    const file = e.target.files[0];
    console.log('file',file);
    
    if (file) {
      setTopicImage(file)  ;
    }
  }
console.log('topicImage',topicImage,imagePreview);

  const handleSave = () => {
    const formData = new FormData();
    formData.append('desc',desc);
    formData.append('title',title);
    formData.append('designation',designation);
    formData.append('email',email);
    formData.append('name',name);
    formData.append('topic',topic);
    formData.append('image',image );
    formData.append('topicImage',topicImage);

    axios
      .post(
        'http://localhost:3000/api/blogs',
        
          formData
        ,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          referrerPolicy: 'no-referrer',
        }
      )
      .then((response) => {
        if (response) {
          toast('Post content saved successfully!');
          console.log('saved');
        }
      })
      .catch((error) => {
        if (error) {
          console.log('error');
        }
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '20px auto',
      }}
    >
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Blog Post Form</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginBottom: '15px',
        }}
      >
        {imagePreview && image ? (
          <div style={styles.imagePreviewContainer}>
            <img src={imagePreview} alt="Uploaded" style={styles.imagePreview} />
          </div>
        ) : <></>}
        <label style={styles.label}>User Image:</label>
        <input
          onChange={handleImageChange}
          type="file"
          style={styles.fileInput}
        />

      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Name:</label>
        <input
          onChange={handleInput}
          placeholder="Enter name"
          value={name}
          name="name"
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Email:</label>
        <input
          onChange={handleInput}
          placeholder="Enter Email"
          value={email}
          type="email"
          name="email"
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Designation/Role:</label>
        <input
          onChange={handleInput}
          placeholder="Enter Designation"
          value={designation}
          name="designation"
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Heading:</label>
        <input
          onChange={handleInput}
          placeholder="Enter title"
          value={title}
          name="title"
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Topic:</label>
        <input
          onChange={handleInput}
          placeholder="Enter Topic"
          value={topic}
          name="topic"
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Topic Image:</label>
        <input
          onChange={handleTopicImageChange}
          type="file"
          style={styles.fileInput}
        />
      </div>
      <Editor
        name="myHtmlEditor"
        onHtmlChange={handleHtmlChange}
        placeholder="Enter some text"
      />
      <button style={styles.saveButton} onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

const styles = {
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '5px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputHover: {
    borderColor: '#007bff',
  },
  saveButton: {
    marginTop: '20px',
    padding: '12px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  saveButtonHover: {
    backgroundColor: '#0056b3',
  },
  fileInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  imagePreviewContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
  },
  imagePreview: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #ddd',
    marginBottom: '20px'
  },
};

export default Form;
