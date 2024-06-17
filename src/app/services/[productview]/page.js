"use client";

import { useContext, useEffect, useState } from "react";
import addproductstyle from "../../style/addproduct.module.css";
import DataContext from "../../Data/DataContext";
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";
import Image from "next/image";

const ProductView = ({ params }) => {
    const router = useRouter();
    const id = params.productview;
    const { fetchProductById, singleProduct, fetchServiceById, category, apiUrl } = useContext(DataContext);

    const [subCategory, setsubCategory] = useState([]);
    const [selectedBadge, setSelectedBadge] = useState(''); // State for Badge

    useEffect(() => {
        fetchProductById(id);
    }, [id, fetchProductById]);

    useEffect(() => {
        if (singleProduct.selectedCategory) {
            fetchServiceById(singleProduct.selectedCategory);
        }
        if (singleProduct.selectedSubCategory) {
            const fetchSubServiceById = async (clientId) => {
                try {
                    const response = await fetch(`${apiUrl}/categories/${clientId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch specific category');
                    }
                    const jsonData = await response.json();
                    setsubCategory(jsonData);
                } catch (error) {
                    console.error('Error fetching specific category:', error);
                    return [];
                }
            }
            fetchSubServiceById(singleProduct.selectedSubCategory);
        }
    }, [singleProduct, fetchServiceById, apiUrl]);

    useEffect(() => {
        if (singleProduct.badge) {
            setSelectedBadge(singleProduct.badge);
        }
    }, [singleProduct]);

    const renderImages = () => {
        return singleProduct.images.map((imageName, index) => (
            <Image key={index} src={`${apiUrl}/productimage/${imageName}`} alt={`Image ${index}`} width={1280} height={720} className={addproductstyle.productImage} style={{ marginRight: '10px' }} />
        ));
    };

    return (
        <div className={addproductstyle.main}>
            <form>
                <h2>Product Detail</h2>
                <div className={addproductstyle.productImagesContainer}>
                    {singleProduct.images && renderImages()}
                </div>

                <div className={addproductstyle.categorySelect}>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select name="category" id="" readOnly>
                            <option>{category.name}</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="subCategory">Sub Category</label>
                        <select name="subCategory" id="" readOnly>
                            <option>{subCategory.name}</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={singleProduct.name} readOnly />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" value={singleProduct.description} readOnly />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" value={singleProduct.price} readOnly />
                </div>
                <div>
                    <label htmlFor="discount">Discount</label>
                    <input type="number" name="discount" value={singleProduct.discount} readOnly />
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <input type="number" name="stock" value={singleProduct.stock} readOnly />
                </div>
                <div>
                    <label htmlFor="servicePartner">Service Partner</label>
                    <input type="number" name="servicePartner" value={singleProduct.servicePartner} readOnly />
                </div>
                <div>
                    <label htmlFor="duration">Enter Duration</label>
                    <input type="number" name="duration" value={singleProduct.duration} readOnly />
                </div>

                <div>
                        <label htmlFor="duration">Enter Rating</label>
                        <input type="text" name="rating" value={singleProduct.rating} readOnly />
                    </div>

                <div className={addproductstyle.statusbox}>
                    <label htmlFor="badge">Select Badge</label>
                    <select name="badge" value={selectedBadge} readOnly>
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

                <div className={addproductstyle.questionbox}>
                    <label htmlFor="minimumOrder">Does minimum order value check applies? </label>
                    <span style={{ marginLeft: '20px' }}>{singleProduct.minimumOrder ? 'Yes' : 'No'}</span>
                </div>

                <div className={addproductstyle.questionbox}>
                    <label htmlFor="hygineCharge">Does hygiene charge applies?</label>
                    <span style={{ marginLeft: '20px' }}>{singleProduct.hygineCharge ? 'Yes' : 'No'}</span>
                </div>

                <div className={addproductstyle.statusbox}>
                    <label htmlFor="status">Status</label>
                    <select name="status" value={singleProduct.status} readOnly>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default ProductView;
