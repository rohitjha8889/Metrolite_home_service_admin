"use client";
import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [banner, setBanner] = useState([]);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [category, setCategory] = useState('');
  const [lastchild, setlastchild] = useState([])


  // Product Page 
  const[allproducts, setAllProducts] = useState([]);
  const[singleProduct, setSingleProduct] = useState('')

  const apiUrl = "https://metrolite.co.in:5000"
  // const apiUrl = "http://localhost:5000"

  useEffect(() => {
    fetchBanner(); // Fetch banner data when component mounts
    fetchServices();
    fetchSubServices();
    fetchServiceById();
    fetchAllProduct()

  }, []);



  const fetchBanner = async () => {
    try {
      const response = await fetch(`${apiUrl}/allposter`);
      if (!response.ok) {
        throw new Error('Failed to fetch banners');
      }
      const jsonData = await response.json();
      setBanner(jsonData.reverse());
    } catch (error) {
      console.error('Error fetching banner data:', error);
    }
  };

  const deleteBanner = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/deleteposter/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete banner');
      }
      fetchBanner();
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  const uploadBanner = async (formData) => {
    try {
      const response = await fetch(`${apiUrl}/uploadposter`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Image uploaded successfully");
        fetchBanner();
        return true; // Indicate success
      } else {
        console.error("Failed to upload image");
        return false; // Indicate failure
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return false; // Indicate failure
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`${apiUrl}/allcategories`);
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const jsonData = await response.json();
      setServices(jsonData.reverse());
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  const fetchSubServices = async (clientId) => {
    try {
      const response = await fetch(`${apiUrl}/categories/${clientId}/children`);
      if (!response.ok) {
        throw new Error('Failed to fetch sub-services');
      }
      const jsonData = await response.json();
      setSubServices(jsonData)
    } catch (error) {
      console.error('Error fetching sub-service data:', error);
      return [];
    }
  };

  const fetchServiceById = async (clientId) => {
    try {
      const response = await fetch(`${apiUrl}/categories/${clientId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch specific category');
      }
      const jsonData = await response.json();
      setCategory(jsonData)
      
      return jsonData
    } catch (error) {
      console.error('Error fetching specific category:', error);
      return [];
    }
  }

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/deletecategory/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      fetchServices()

    } catch (error) {
      console.error('Error deleting delete category:', error);
    }
  };
  const deleteSubCategory = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/deletecategory/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      fetchServices()

    } catch (error) {
      console.error('Error deleting delete category:', error);
    }
  };



  const createCategory = async (formData) => {
    try {
      const response = await fetch(`${apiUrl}/categories`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Category created successfully");
        fetchServices()
        return true;
      } else {
        console.error("Failed to create category");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };


  const modifyCategory = async (id, categoryData) => {
    try {
      // console.log(id, categoryData)
      // console.log(categoryData.parent)
      const formData = new FormData();
  
      // Append text data
      formData.append('name', categoryData.name);
      formData.append('position', categoryData.position);
      if (categoryData.parent !== null) {
        formData.append('parent', categoryData.parent);
      }
  

      
      
      // Append image data
      if (categoryData.categoryImage) {
        formData.append('categoryImage', categoryData.categoryImage);
      }
  
      const response = await fetch(`${apiUrl}/categories/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (categoryData.parent !== null){
        fetchSubServices(categoryData.parent)
      }
      else{

        fetchServices()
      }


      // fetchSubServices(categoryData.parent)
  
      if (!response.ok) {
        throw new Error('Failed to modify category');
      }
  
      // Handle response as needed
  
    } catch (error) {
      console.error('Error modifying category:', error);
    }
  };
  const fetchLastChildById = async (categoryId) => {
    try {
      const response = await fetch(`${apiUrl}/last-level-children/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sub-services');
      }
      const jsonData = await response.json();
      setlastchild(jsonData)
    } catch (error) {
      console.error('Error fetching sub-service data:', error);
      return [];
    }
  }


// Product Api fetching


  const addProduct = async (formData) => {
    try {


      const response = await fetch(`${apiUrl}/addproduct`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Product added successfully");
        fetchAllProduct()
        return true;
      } else {
        console.error("Failed to add Product");
        return false;
      }

    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }



  const fetchAllProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/getallproduct`);
      if (!response.ok) {
        throw new Error('Failed to fetch all product');
      }
      const jsonData = await response.json();
      setAllProducts(jsonData.reverse());
      
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };


  const fetchProductById = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/getproduct/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch specific category');
      }
      const jsonData = await response.json();
      setSingleProduct(jsonData)
      return jsonData
    } catch (error) {
      console.error('Error fetching specific category:', error);
      return [];
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/deleteproduct/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      fetchAllProduct()

    } catch (error) {
      console.error('Error deleting delete category:', error);
    }
  };


  const deleteProductImage = async (id, imageName) => {
    try {
      const response = await fetch(`${apiUrl}/products/${id}/images/${imageName}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product Image');
      }
      

    } catch (error) {
      console.error('Error deleting product Images:', error);
    }
  };


  

  // const addProductImages = async (formData) => {
  //   try {


  //     const response = await fetch(`${apiUrl}/addproduct`, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       console.log("Product added successfully");
  //       fetchAllProduct()
  //       return true;
  //     } else {
  //       console.error("Failed to add Product");
  //       return false;
  //     }

  //   } catch (error) {
  //     console.error("Error:", error);
  //     return false;
  //   }
  // }



  const modifyProduct = async (productId, formData) => {
    try {
      const response = await fetch(`${apiUrl}/modifyproduct/${productId}`, {
        method: 'PUT', // Assuming the API uses PUT for modification
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to modify product');
      }

      
      fetchAllProduct(); 
    } catch (error) {
      console.error('Error modifying product:', error);
    }
  };


  // Bookings Detail

  const [bookingData, setBookingData] = useState([])
  const [updatedBooking, setUpdatedBooking] = useState([])
  const [editBooking, setEditBooking] = useState()

  useEffect(()=>{
    fetchAllBooking()
  },[])

  useEffect(() => {
    fetchBookingData();
  }, [bookingData]);



  const fetchAllBooking = async() =>{
    try {
      const response = await fetch(`${apiUrl}/user/allorders`);
      if (!response.ok) {
        throw new Error('Failed to fetch all Bookings');
      }
      const jsonData = await response.json();
      // console.log(jsonData)
      setBookingData(jsonData.data.reverse());
      // setBookingData(jsonData);
      
      
    } catch (error) {
      console.error('Error fetching Booking  data:', error);
    }
  }


  const fetchBookingData = async () => {
    try {
      const bookingDetail = await Promise.all(
        bookingData.map(async (item) => {
          try {
            const responseUser = await fetch(`${apiUrl}/user/profiledetail/${item.user}`);
            if (!responseUser.ok) {
              throw new Error('Failed to fetch details from User API');
            }
  
            const userDetail = await responseUser.json();
  
            let addressDetail;
            try {
              const responseAddress = await fetch(`${apiUrl}/user/address/${item.bookingAddress}`);
              if (!responseAddress.ok) {
                throw new Error('Failed to fetch details of Address');
              }
              addressDetail = await responseAddress.json();
            } catch (error) {
              console.log("Error fetching Address Detail", error);
              addressDetail = { address: 'Not available' }; // Default value when address fetch fails
            }
  
            return { ...item, userDetail: userDetail, addressDetail: addressDetail };
          } catch (error) {
            console.log("Error fetching User Detail", error);
            return item;
          }
        })
      );
  
      setUpdatedBooking(bookingDetail);
    } catch (error) {
      console.log("Error Fetching Booking Detail", error);
    }
  };

  const deleteOrder = async (orderId) => {
    // const apiUrl = 'https://your-api-url.com/api/orders'; // Replace with your actual API URL
  
    try {
      const response = await fetch(`${apiUrl}/user/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete order');
      }
  
      const result = await response.json();
      console.log('Order deleted successfully:', result);
      fetchAllBooking()
      return result;
    } catch (error) {
      console.error('Error deleting order:', error.message);
      throw error;
    }
  };


  
  const fetchBookingById = async (orderId) => {
    try {
      const response = await fetch(`${apiUrl}/user/getorder/${orderId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEditBooking(data);
      return data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  };


  const updateBookingStatus = async (orderId, status) => {
    try {
      const response = await fetch(`${apiUrl}/user/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      fetchAllBooking(); // Fetch all bookings after update
      return data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  



  // Sub Category Banner

  const uploadSubCategoryBanner = async (categoryId, bannerImage) => {
    const formData = new FormData();
    formData.append('categoryId', categoryId);
    formData.append('bannerImage', bannerImage);

    console.log(bannerImage, categoryId)
    try {
      const response = await fetch(`${apiUrl}/subCategoryBanner`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Error uploading subcategory banner');
      }
  
      const data = await response.json();
      fetchAllSubCategoryBanners()
      console.log('Subcategory banner uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading subcategory banner:', error);
    }
  };



  const [allSubCateBanner, setAllSubCatBanner] = useState([])

  const fetchAllSubCategoryBanners = async () => {
  try {
    const response = await fetch(`${apiUrl}/subCategoryBanners`);
    if (!response.ok) {
      throw new Error('Error fetching subcategory banners');
    }

    const data = await response.json();
    console.log('Fetched subcategory banners:', data);
    setAllSubCatBanner(data)
    return data;
  } catch (error) {
    console.error('Error fetching subcategory banners:', error);
    return [];
  }
};


const deleteSubCategoryBanner = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/subCategoryBanner/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting subcategory banner');
    }

    const data = await response.json();
    console.log('Subcategory banner deleted successfully:', data);
    fetchAllSubCategoryBanners()
    return data;
  } catch (error) {
    console.error('Error deleting subcategory banner:', error);
    return null;
  }
};


  

  return (
    <DataContext.Provider value={{ banner, deleteBanner, uploadBanner, services, fetchSubServices, subServices, createCategory, fetchServiceById, category, deleteCategory, deleteSubCategory, fetchLastChildById, lastchild, modifyCategory, 
      
      
      addProduct, allproducts, fetchProductById, singleProduct, deleteProduct, modifyProduct, apiUrl,
      deleteProductImage,
    

      bookingData,
      updatedBooking,
      fetchAllBooking,
      fetchBookingById,
      editBooking,
      updateBookingStatus,

      // Sub category
    uploadSubCategoryBanner,
    fetchAllSubCategoryBanners,
    allSubCateBanner,
    deleteSubCategoryBanner,


    deleteOrder,
    
    
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
