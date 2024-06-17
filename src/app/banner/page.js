"use client";
import styleComplaint from "../style/complaints.module.css";
import DataContext from "../Data/DataContext";
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import Loader from "../components/Loader";

const Banner = () => {
  const { banner, deleteBanner, apiUrl } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Simulate data fetching completion after component mounts
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBanner(id);
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className={styleComplaint.loader}>
          <Loader/>
        </div>
      ) : (
        <div className={styleComplaint.main}>
          <div className={styleComplaint.heading}>
            <h1>All Banners</h1>
          </div>

          <div className={styleComplaint.dataTable}>
            <div className={styleComplaint.search}>
              <div>
                <span>Customer Application Banner</span>
              </div>
              <div>
                <button className={styleComplaint.uploadPageBtn}>
                  <Link href="/imageupload">Upload Image</Link>
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
                    <th style={{ width: "10%", textAlign: "center" }}>Url</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Position</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {banner.length === 0 ? (
                    <tr>
                      <td colSpan="3">No banners available</td>
                    </tr>
                  ) : (
                    banner.map((bannerItem, index) => {
                      let bannerUrl = `${apiUrl}/allposter/${bannerItem.poster}`;
                      return (
                        <tr key={index}>
                          <td style={{ width: "5%", textAlign: "center" }}>{index + 1}</td>
                          <td style={{ width: "30%", textAlign: "center" }}>
                            <Image src={bannerUrl} width={300} height={200} alt="banner" />
                          </td>
                          <td style={{ width: "10%", textAlign: "center" }}>{bannerItem.url}</td>
                          <td style={{ width: "10%", textAlign: "center" }}>{bannerItem.position}</td>
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
    </>
  );
};

export default Banner;
