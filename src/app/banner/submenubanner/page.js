"use client";
import styleComplaint from "../../style/complaints.module.css";
import modalStyles from "./modal.module.css";
import DataContext from "../../Data/DataContext";
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import Loader from "../../components/Loader";

const SubMenuBanner = () => {
  const { banner, deleteBanner, apiUrl, services,  uploadSubCategoryBanner, fetchAllSubCategoryBanners, allSubCateBanner, deleteSubCategoryBanner } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [position, setPosition] = useState(""); // Add state for position

  useEffect(() => {
    setLoading(false); // Simulate data fetching completion after component mounts
    fetchAllSubCategoryBanners()
  }, []);

  useEffect(()=>{
    console.log(allSubCateBanner)
  },[allSubCateBanner])

  const handleDelete = async (id) => {
    try {
      await deleteSubCategoryBanner(id);
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bannerImage && position) {
      console.log("Image File:", bannerImage);
      console.log("Selected Position:", position);
      uploadSubCategoryBanner(position, bannerImage)
      handleClose()
    } else {
      console.error("Please select an image and a position");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setPreview(null);
    setBannerImage(null);
    setPosition("");
  };

  return (
    <>
      {loading ? (
        <div className={styleComplaint.loader}>
          <Loader />
        </div>
      ) : (
        <div className={styleComplaint.main}>
          <div className={styleComplaint.heading}>
            <h1>Sub Category Banners</h1>
          </div>

          <div className={styleComplaint.dataTable}>
            <div className={styleComplaint.search}>
              <div>
                <span>Sub Category Banner</span>
              </div>
              <div>
                <button
                  className={styleComplaint.uploadPageBtn}
                  onClick={() => setShowModal(true)}
                >
                  Upload Banner
                </button>
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
                    
                    <th style={{ width: "10%", textAlign: "center" }}>Position</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allSubCateBanner.length === 0 ? (
                    <tr>
                      <td colSpan="5">No banners available</td>
                    </tr>
                  ) : (
                    allSubCateBanner.map((bannerItem, index) => {
                      let bannerUrl = `${apiUrl}/subcateposter/${bannerItem.bannerImage}`;
                      return (
                        <tr key={index}>
                          <td style={{ width: "5%", textAlign: "center" }}>{index + 1}</td>
                          <td style={{ width: "30%", textAlign: "center" }}>
                            <Image
                              src={bannerUrl}
                              width={300}
                              height={200}
                              alt="banner"
                            />
                          </td>
                         
                          <td style={{ width: "10%", textAlign: "center" }}>
                            {bannerItem.categoryId.name}
                          </td>
                          <td style={{ width: "10%", textAlign: "center" }}>
                            <button
                              className={styleComplaint.deleteBtn}
                              onClick={() => handleDelete(bannerItem._id)}
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
        </div>
      )}

      {showModal && (
        <div className={modalStyles.modalOverlay}>
          <div className={modalStyles.modalContent}>
            <div className={modalStyles.modalHeader}>
              <h2>Upload Banner</h2>
              <button
                className={modalStyles.closeButton}
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            <div className={modalStyles.modalBody}>
              {preview && (
                <Image
                  src={preview}
                  alt="Preview"
                  className={modalStyles.previewImage}
                  width={300}
                  height={200}
                />
              )}
              <form onSubmit={handleSubmit}>
                <div className={modalStyles.formGroup}>
                  <label htmlFor="bannerImage">Select Image</label>
                  <input
                    type="file"
                    id="bannerImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className={modalStyles.formGroup}>
                  <label htmlFor="bannerPosition">Position</label>
                  <select
                    id="bannerPosition"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {services.map((category, index) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className={modalStyles.submitButton}>
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubMenuBanner;
