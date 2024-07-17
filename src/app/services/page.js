"use client";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../Data/DataContext";
import Link from "next/link";
import Image from "next/image";
import styleComplaint from "../style/complaints.module.css";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Services = () => {
  const router = useRouter();
  const { allproducts, deleteProduct, apiUrl, services } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const productsPerPage = 30;


  useEffect(() => {
    if (router.query && router.query.category) {
      setSelectedCategory(router.query.category);
    }
  }, [router.query]);
  

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? allproducts.filter(product => product.selectedCategory === selectedCategory)
    : allproducts;

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle category change
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    setCurrentPage(1); // Reset to first page when category changes
    router.push(`/services?category=${newCategory}`, undefined, { shallow: true });
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

//   useEffect (()=>{
// console.log(allproducts)
//   },[allproducts])



  return (
    <>
      <div className={styleComplaint.main} style={{ minHeight: "100vh", marginBottom:"20px" }}>
        <div className={styleComplaint.heading}>
          <h1>All Services</h1>
        </div>

        <div className={styleComplaint.dataTable}>
          <div className={styleComplaint.search}>
            <div>
              <span>Available Service</span>
            </div>
            <div className={styleComplaint.filterServiceBox}>
              <select name="category" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select a category</option>
                {services.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button className={styleComplaint.uploadPageBtn}>
                <Link href="/services/addproduct">Add Product</Link>
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
                  <th style={{ width: "20%", textAlign: "center" }}>Image</th>
                  <th style={{ width: "10%", textAlign: "center" }}>Name</th>
                  <th style={{ width: "10%", textAlign: "center" }}>Price</th>
                  <th style={{ width: "10%", textAlign: "center" }}>Status</th>
                  <th style={{ width: "10%", textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6">No Service Available</td>
                  </tr>
                ) : (
                  currentProducts.map((product, index) => {
                    let productImage = `${apiUrl}/productimage/${product.images[0]}`;
                    return (
                      <tr key={index}>
                        <td style={{ width: "5%", textAlign: "center" }}>
                          {indexOfFirstProduct + index + 1}
                        </td>
                        <td style={{ width: "20%", textAlign: "center" }}>
                          <Image
                            src={productImage}
                            width={200}
                            height={100}
                            alt="Image"
                          />
                        </td>
                        <td style={{ width: "10%", textAlign: "center" }}>
                          {product.name}
                        </td>
                        <td style={{ width: "10%", textAlign: "center" }}>
                          ₹{product.price}
                        </td>
                        <td style={{ width: "10%", textAlign: "center" }}>
                          {product.status}
                        </td>
                        <td style={{ width: "10%", textAlign: "center" }}>
                          <button
                            style={{
                              all: "unset",
                              fontSize: "1.5rem",
                              color: "#001884",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                          >
                            <Link href={`/services/${product._id}`}>
                              <FaEye />
                            </Link>
                          </button>

                          <button
                            style={{
                              all: "unset",
                              fontSize: "1.5rem",
                              color: "#001884",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                          >
                            <Link href={`/services/updateproduct/${product._id}`}>
                              <FaEdit />
                            </Link>
                          </button>
                          <button
                            className={styleComplaint.deleteBtn}
                            onClick={() => handleDelete(product._id)}
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
            <div className={styleComplaint.pagination}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={
                    currentPage === index + 1
                      ? styleComplaint.activePage
                      : ""
                  }
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
