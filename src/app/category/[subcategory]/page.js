"use client";
import { useContext, useEffect, useState } from "react"
import Link from "next/link";
import DataContext from "../../Data/DataContext";
import Image from "next/image";
import styleComplaint from "../../style/complaints.module.css";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Loader from "@/app/components/Loader";
import '../style.css'
const Subcategory = ({ params }) => {
  const { fetchSubServices, subServices, fetchServiceById, category, deleteSubCategory, apiUrl, modifyCategory } = useContext(DataContext)
  const clientId = params.subcategory;
  const [loading, setLoading] = useState(true);
  
  const [showAddClientPopup, setShowAddClientPopup] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryData, setCategoryData] = useState({
    name: "",
    categoryImage:"",
    parent: ""
  });


  const handleModifyCategory = (id) => {
    setShowAddClientPopup(true);
    fetchServiceById(id)
      .then((data) => {
        // console.log(data)
        setCategoryData({
          name: data.name,
          categoryImage:"",
          parent: clientId,
          position:'' 
        });
        setImagePreview(`${apiUrl}/categoryicon/${data.categoryImage}`);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  };

  const handleCloseAddEmployeePopup = () => {
    setShowAddClientPopup(false);
    setImagePreview(null); // Reset image preview when closing popup
  };

 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setCategoryData(prevState => ({
          ...prevState,
          categoryImage: file // Update categoryImage state with the new image
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const refreshScreen =(clientId) =>{
    setLoading(true);
  
    // Fetch sub-services and set loading to false after 2 seconds
    fetchSubServices(clientId)
      .then(() => {
        setTimeout(() => setLoading(false), 1000); // Set loading to false after 2 seconds
      })
      .catch(() => {
        // Handle error while fetching sub-services and set loading to false immediately
        setLoading(false);
      });
  
    // Fetch service by ID
    fetchServiceById(clientId);

  }
  const handleSaveCategoryChange = () => {
   

    const id = category._id
    // console.log(id)
    // console.log(clientId)
    // console.log(categoryData)
    // console.log(categoryData)
    modifyCategory(id, categoryData)
    handleCloseAddEmployeePopup()
    refreshScreen(clientId)
    
    
  };




  

  const handleDelete = (id)=>{
    deleteSubCategory(id)
  }

  useEffect(() => {
    // Set loading state to true initially
    setLoading(true);
  
    // Fetch sub-services and set loading to false after 2 seconds
    fetchSubServices(clientId)
      .then(() => {
        setTimeout(() => setLoading(false), 1000); // Set loading to false after 2 seconds
      })
      .catch(() => {
        // Handle error while fetching sub-services and set loading to false immediately
        setLoading(false);
      });
  
    // Fetch service by ID
    fetchServiceById(clientId);
  }, [clientId]);


  useEffect(()=>{
    console.log(subServices);
    console.log(category)
  },[subServices, category])

  return (
    <>
   {loading ? (
  // Display loader if loading state is true
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '9999',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
    height: '100%'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }}>
      <Loader/>
    </div>
  </div>
      ) : (
      <div className={styleComplaint.main} style={{ minHeight: '100vh' }}>
        <div className={styleComplaint.heading}>
          <h1> All SubCategory</h1>
        </div>

        <div className={styleComplaint.dataTable}>
          <div className={styleComplaint.search}>
            <div>
              <span>SubCategory of {category.name} </span>
            </div>
            <div>

              <button className={styleComplaint.uploadPageBtn}><Link href={`/category/createcategory/${clientId}`}>Add Subcategory</Link> </button>
            </div>
          </div>
          <hr />

          <div className="filter"></div>

          <div className={styleComplaint.data}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "5%", textAlign: "center" }}>S.NO</th>
                  <th style={{ width: "30%", textAlign: "center" }}>Banner</th>
                  <th style={{ width: "10%", textAlign: "center" }}>Name</th>

                  <th style={{ width: "10%", textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {subServices.length === 0 ? (
                  <tr>
                    <td colSpan="3">No Category Available</td>
                  </tr>
                ) : (
                  subServices.map((service, index) => {
                    let categoryImage = `${apiUrl}/categoryicon/${service.categoryImage}`;
                    return (

                      <tr key={index}>
                        <td style={{ width: "5%", textAlign: "center" }}>
                          {index + 1}
                        </td>
                        <td style={{ width: "30%", textAlign: "center" }}>
                          <Image src={categoryImage} width={100} height={100} alt="category Image"/>
                        </td>
                        <td style={{ width: "10%", textAlign: "center" }}>
                          {service.name}
                        </td>

                        <td style={{ width: "10%", textAlign: "center" }}>
                          <button style={{ all: 'unset', fontSize: '2rem', color: '#001884', cursor: 'pointer', marginRight: '20px' }}><Link href={`/category/${service._id}`}><FaEye /></Link></button>

                          <button style={{ all: 'unset', fontSize: '1.5rem', color: '#001884', cursor: 'pointer', marginRight: '20px' }} onClick={() => handleModifyCategory(service._id)}><FaEdit /></button>
                          <button
                            className={styleComplaint.deleteBtn}
                            onClick={()=>handleDelete(service._id)}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>


        {showAddClientPopup && (
          <div className="popup-container">
            <div className="popup">
              <div>
                <h2>Modify Category</h2>
                <button className="button danger" onClick={handleCloseAddEmployeePopup}>
                  <IoMdClose size={20} />
                </button>
              </div>

              {imagePreview && <img src={imagePreview} alt="Preview" width={100} height={100} />}
              <input type="file" onChange={handleImageChange} className="inputImage" />
              <input type="text" placeholder="Name" value={categoryData.name} onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })} />

              {/* <select value={categoryData.position} onChange={(e) => setCategoryData({ ...categoryData, position: e.target.value })}>
                <option value="">Select Position</option>
                <option value="Most Discounted">Most Discounted</option>
                <option value="Most Booked">Most Booked</option>
                <option value="Upcoming Service">Upcoming Service</option>
              </select> */}


              <button className="button primary" onClick={handleSaveCategoryChange}>Save Changes</button>
            </div>
          </div>
        )}
      </div>

)}
    </>
  )
}

export default Subcategory;
