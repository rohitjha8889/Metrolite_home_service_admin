"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import DataContext from '../../Data/DataContext'; // Update path accordingly
import styleImage from '../../style/imageupload.module.css'
const CreateCategory = () => {
  const router = useRouter();
  const { createCategory } = useContext(DataContext); // Access createCategory function from context
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState(''); // State for dropdown value
  const [imagePreview, setImagePreview] = useState(null);


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
    formData.append('position', selectedValue); // Include selected value in formData

    try {
      const uploadSuccess = await createCategory(formData);
      if (uploadSuccess) {
        console.log("Category created successfully");
        setName('');
        setImage(null);
        setSelectedValue('');
        router.push('/category');
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

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className={styleImage.main} style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit}>
      <h2>Add Category</h2>
        <input type="text" value={name} onChange={handleInputChange}  placeholder='Enter Category Name'/>
        <span>Please select image in square format or 1024 * 1024px</span>
        <input type="file" accept="image/*" onChange={handleImageChange} name='categoryImage'/>

        {/* Dropdown for selecting a value */}
        <select value={selectedValue} onChange={handleSelectChange}>
          <option value="">Select Position</option>
          <option value="Most Discounted">Most Discounted</option>
          <option value="Most Booked">Most Booked</option>
          <option value="Upcoming Service">Upcoming Service</option>
        </select>

        <button type="submit">Submit</button>
      </form>


      {/* Image preview */}
      {imagePreview && (
        <div>
          <h2>Selected Image Preview:</h2>
          <Image src={imagePreview} alt="Selected" style={{ width:'300px', height:'300px' }} width={300} height={300}/>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
