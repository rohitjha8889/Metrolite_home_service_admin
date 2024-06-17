"use client";
import { useState, useContext, useEffect } from "react";

import addproductstyle from "../../../style/addproduct.module.css";
import DataContext from "../../../Data/DataContext";
import { useRouter } from 'next/navigation'; // Importing 'next/router' instead of 'next/navigation'
// Importing 'next/router' instead of 'next/navigation'
import Image from "next/image";

const UpdateProduct = ({ params }) => {
    const router = useRouter();
    const { services, fetchLastChildById, lastchild, fetchProductById, singleProduct, modifyProduct, apiUrl, deleteProductImage } = useContext(DataContext);

    const productId = params.update

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        discount: 0,
        stock: 0,
        servicePartner: 0,
        duration: 0,
        selectedCategory: '', // Change category field to selectedCategory
        selectedSubCategory: '', // Change subCategory field to selectedSubCategory
        status: 'active',
        badge:'',
        rating:''
    });
    const [newImagesPreview, setNewImagesPreview] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchProductById(productId)
        console.log("Hello")
    }, [productId])

    useEffect(() => {
        if (singleProduct) {
            setFormData({
                name: singleProduct.name,
                description: singleProduct.description,
                price: singleProduct.price,
                discount: singleProduct.discount,
                stock: singleProduct.stock,
                servicePartner: singleProduct.servicePartner,
                duration: singleProduct.duration,
                selectedCategory: singleProduct.selectedCategory, // Update category field to selectedCategory
                selectedSubCategory: singleProduct.selectedSubCategory, // Update subCategory field to selectedSubCategory
                status: singleProduct.status,
                badge: singleProduct.badge,
                rating: singleProduct.rating

            });

            fetchLastChildById(singleProduct.selectedCategory)

            // console.log(singleProduct.selectedSubCategory)
        }

        console.log("Hello Product")
    }, [singleProduct]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        fetchLastChildById(value); // Fetch subcategories based on the selected category
        setFormData({ ...formData, selectedCategory: value }); // Update selectedCategory state
    };

    const handleSubCategoryChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, selectedSubCategory: value });
    };

    const handleStatusChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, status: value });
    };

    const handleBadgeChange = (e) =>{
        const {value} = e.target;
        setFormData({...formData, badge: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        modifyProduct(productId, formData)
        router.push('/services')
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first file from the selected files
        if (file) {
            const imagePreview = URL.createObjectURL(file);
            setNewImagesPreview([...newImagesPreview, imagePreview]);
            setSelectedImage(file); // Update the selected image
        }
    };

    const handleDeleteImage = async (name) => {
        await deleteProductImage(productId, name);
        fetchProductById(productId)
    }


    const handleSaveImage = async () => {
        if (!selectedImage) return;

        try {
            const formData = new FormData();
            formData.append('images', selectedImage); // Append the selected image to the FormData object
            console.log(formData)
            const response = await fetch(`${apiUrl}/products/${productId}/images`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to save image');
            }

            console.log('Image saved successfully');
            // Reset state or perform any necessary actions after saving the image
            fetchProductById(productId);
            // Clear the selected image after saving
            setSelectedImage(null);
            setNewImagesPreview([])
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };




    const renderImages = () => {
        return singleProduct.images.map((imageName, index) => (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <Image key={index} src={`${apiUrl}/productimage/${imageName}`} alt={`Image ${index}`} width={1280} height={720} className={addproductstyle.productImage} style={{ marginRight: '10px' }} />
                <button type="button" onClick={() => handleDeleteImage(imageName)} style={{ marginTop: '10px', marginBottom: '20px' }}  >Delete</button>
            </div>
        ));
    };

    const renderNewImagesPreview = () => {
        return newImagesPreview.map((preview, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={preview} alt="Preview" width={1280} height={720} style={{ marginRight: '10px' }} />

                <div style={{ marginTop: '10px', marginBottom: '20px' }}>

                    <button type="button" onClick={handleSaveImage} style={{ marginLeft: "10px" }}>Save</button>
                </div>
            </div>
        ))
    };

    return (
        <>

            <div className={addproductstyle.main}>
                <form onSubmit={handleSubmit}>
                    <h2>Update Product</h2>
                    {/* <h4>Present Image</h4> */}
                    <div className={addproductstyle.productImagesContainer}>

                        {singleProduct.images && renderImages()}
                        {renderNewImagesPreview()}
                    </div>

                    <div>
                        <input type="file" accept="image/*" multiple onChange={handleImageChange} />

                    </div>

                    <div className={addproductstyle.categorySelect}>
                        <div>
                            <label htmlFor="category"> Select Category</label>
                            <select name="category" value={formData.selectedCategory} onChange={handleCategoryChange}>
                                <option value="">Select a category</option>
                                {services.map((category) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="subCategory"> Select Sub Category</label>
                            <select name="subCategory" value={formData.selectedSubCategory} onChange={handleSubCategoryChange}>
                                <option value="">Select a subcategory</option>
                                {lastchild.map((subcategory) => (
                                    <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Enter Name" onChange={handleInputChange} value={formData.name} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea type="text" name="description" placeholder="Enter Description" onChange={handleInputChange} value={formData.description} />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" placeholder="Enter Price" min={0} onChange={handleInputChange} value={formData.price} />
                    </div>
                    <div>
                        <label htmlFor="discount">Discount</label>
                        <input type="number" name="discount" placeholder="Enter Discount" min={0} onChange={handleInputChange} value={formData.discount} />
                    </div>
                    <div>
                        <label htmlFor="stock">Stock</label>
                        <input type="number" name="stock" placeholder="Enter Stock" min={0} onChange={handleInputChange} value={formData.stock} />
                    </div>
                    <div>
                        <label htmlFor="servicePartner">Service Partner</label>
                        <input type="number" name="servicePartner" placeholder="Enter Service Partner" min={0} onChange={handleInputChange} value={formData.servicePartner} />
                    </div>
                    <div>
                        <label htmlFor="duration">Enter Duration</label>
                        <input type="number" name="duration" placeholder="Enter Duration" min={0} onChange={handleInputChange} value={formData.duration} />
                    </div>


                    <div>
                        <label htmlFor="duration">Enter Rating</label>
                        <input type="text" name="rating" placeholder="Enter Rating"  onChange={handleInputChange} value={formData.rating}/>
                    </div>

                    <div className={addproductstyle.statusbox}>
                        <label htmlFor="badge">Select Badge</label>
                        <select name="badge" value={formData.badge} onChange={handleBadgeChange}>
                        <option value="">Select a badge</option>
                            <option value="New">New</option>
                            <option value="Bestseller">Bestseller</option>
                            <option value="Hot Deal">Hot Deal</option>
                            <option value="New Launch">New Launch</option>
                            <option value="Trending">Trending</option>
                            <option value="Viral">Viral</option>
                            <option value="Must Try">Must Try</option>
                            <option value="In Demand">In Demand</option>
                        </select>
                    </div>

                    <div className={addproductstyle.statusbox}>
                        <label htmlFor="status">Status</label>
                        <select name="status" value={formData.status} onChange={handleStatusChange}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <button type="submit">Update Product</button>
                </form>
            </div>

        </>
    );
};

export default UpdateProduct;
