"use client"
import React, { useContext, useState } from 'react';
import DataContext from '../Data/DataContext'; // Import DataContext
import styleImage from '../style/imageupload.module.css'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const UploadImage = () => {
  const { uploadBanner } = useContext(DataContext); // Consume DataContext
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [text, setText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter();

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading indicator

    if (!image) {
      setErrorMessage("No image selected");
      setLoading(false);
      return;
    }

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("poster", image); // Append the file with key "poster"
      formData.append("url", text); // Append text value
      formData.append("position", selectedOption); // Append selected option value

      // Call uploadBanner function from DataContext
      const uploadSuccess = await uploadBanner(formData);

      if (uploadSuccess) {
        console.log("Image uploaded successfully");

        // Clear the file input after successful upload
        setImage(null);
        setImageUrl('');
        setText('');
        setSelectedOption('');
        setErrorMessage('Image uploaded successfully');
        router.push("/banner");
      } else {
        console.error("Failed to upload image");
        setErrorMessage("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Error uploading image. Please try again later.");
    } finally {
      setLoading(false); // Stop loading indicator regardless of success or failure
    }
  };

  return (
    <div className={styleImage.main}>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          required
          name="poster"
        />

        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter some text"
          required
        />

        <select value={selectedOption} onChange={handleOptionChange} required>
          <option value="">Select an option</option>
          <option value="Main">Main</option>
          <option value="Most Discounted">Most Discounted</option>
          <option value="Most Booked">Most Booked</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {imageUrl && <Image src={imageUrl} alt="Preview" width={300} height={200} style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }} />} {/* Show image preview */}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default UploadImage;
