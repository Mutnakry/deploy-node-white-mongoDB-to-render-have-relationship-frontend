import React, { useState } from 'react';
import axios from 'axios';

interface LessionFormData {
  les_name: string;
  courses_id: string;
  modales_id: string;
  sub_modales_id: string;
  title: string;
  lessons_type: string;
  coursecode: string;
  description: string;
  user_at: string;
  image: File | null;
  video: File | null;
}

const CreateLessionForm: React.FC = () => {
  const [formData, setFormData] = useState<LessionFormData>({
    les_name: '',
    courses_id: '',
    modales_id: '',
    sub_modales_id: '',
    title: '',
    lessons_type: '',
    coursecode: '',
    description: '',
    user_at: '',
    image: null,
    video: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      // Handle file upload
      if (files) {
        setFormData(prevState => ({
          ...prevState,
          [name]: files[0]
        }));
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('les_name', formData.les_name);
    data.append('courses_id', formData.courses_id);
    data.append('modales_id', formData.modales_id);
    data.append('sub_modales_id', formData.sub_modales_id);
    data.append('title', formData.title);
    data.append('lessons_type', formData.lessons_type);
    data.append('coursecode', formData.coursecode);
    data.append('description', formData.description);
    data.append('user_at', formData.user_at);
    
    if (formData.image) {
      data.append('image', formData.image);
    }
    if (formData.video) {
      data.append('video', formData.video);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/lessons', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Lesson created:', response.data);
    } catch (error) {
      console.error('Error creating lesson:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="les_name"
        placeholder="Lesson Name"
        value={formData.les_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="courses_id"
        placeholder="Course ID"
        value={formData.courses_id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="modales_id"
        placeholder="Modales ID"
        value={formData.modales_id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="sub_modales_id"
        placeholder="Sub Modales ID"
        value={formData.sub_modales_id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lessons_type"
        placeholder="Lessons Type"
        value={formData.lessons_type}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="coursecode"
        placeholder="Course Code"
        value={formData.coursecode}
        onChange={handleChange}
        required
      />
      {/* <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      /> */}
      <input
        type="text"
        name="user_at"
        placeholder="User At"
        value={formData.user_at}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="video"
        accept="video/*"
        onChange={handleChange}
        required
      />
      <button type="submit">Create Lesson</button>
    </form>
  );
};

export default CreateLessionForm;
