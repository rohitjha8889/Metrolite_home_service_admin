"use client";
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataContext from '../../../Data/DataContext';
import styleImage from '../../../style/imageupload.module.css'

const CreateSubCategory = ({ params }) => {
  const router = useRouter();
  const { createCategory } = useContext(DataContext);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const parentId = params.createsubcategory;

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('categoryImage', image);
    formData.append('parentId', parentId);
     // Append position to formData
    try {
      const uploadSuccess = await createCategory(formData);
      
      if (uploadSuccess) {
        console.log("Category created successfully");
        setName('');
        setImage(null);
        
        router.push(`/category/${parentId}`);
      } else {
        console.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  

  return (
    <div className={styleImage.main} style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit}>
      <h2>Add SubCategory</h2>
        <input type="text" value={name} onChange={handleInputChange} />
        <span>Please select image in square format or 1024 * 1024px</span>
        <input type="file" accept="image/*" onChange={handleImageChange} name='categoryImage'/>
       
        <button type="submit">Submit</button>
      </form>

      {imagePreview && (
        <div>
          <h2>Selected Image Preview:</h2>
          <Image src={imagePreview} alt="Selected" style={{ width:'300px', height:'300px' }}  width={300} height={300}/>
        </div>
      )}
    </div>
  );
};

export default CreateSubCategory;
