"use client";
import styleComplaint from "../style/complaints.module.css";
import editPopupStyle from "./editpopup.module.css"; // Import edit popup styles
import React, { useContext, useEffect, useState } from 'react';
import DataContext from "../Data/DataContext";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Bookings = () => {
  const { bookingData, apiUrl, updatedBooking, deleteOrder, fetchBookingById, editBooking, updateBookingStatus } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const [showPopup, setShowPopup] = useState(false); // State for showing/hiding edit popup
  const [selectedBookingId, setSelectedBookingId] = useState(); // State to hold selected booking for edit
  const [selectedStatus, setSelectedStatus] = useState('In Progress'); // State to hold the selected status

  useEffect(() => {
    console.log(updatedBooking);
  }, [updatedBooking]);

  useEffect(() => {
    console.log(bookingData);
  }, [bookingData]);

  // Calculate total pages
  const totalPages = Math.ceil(updatedBooking.length / itemsPerPage);

  // Get current page data
  const currentData = updatedBooking.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle edit button click
  const handleEdit = async (id) => {
    // console.log(id);

    await fetchBookingById(id);
    console.log(editBooking);

    setSelectedBookingId(id)
    if (editBooking) {
      
      setSelectedStatus(editBooking.status !== '' ? editBooking.status : 'In Progress'); // Set the dropdown status
      setShowPopup(true);
    } else {
      console.error('Failed to fetch booking details');
    }
  };

  // Handle delete button click
  const handleDeleteOrder = (id) => {
    console.log(id);
    deleteOrder(id);
  };

  // Handle status change in dropdown
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Close popup
  const handleClosePopup = () => {
    setShowPopup(false);
    // setSelectedBooking(null);
  };

  // Handle save button click
  const handleSave = async () => {
   
    try {
      await updateBookingStatus(selectedBookingId, selectedStatus);
      setShowPopup(false);
      setSelectedBookingId();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  return (
    <>
      <div className={styleComplaint.main}>
        <div className={styleComplaint.heading}>
          <h1>All Bookings</h1>
        </div>

        <div className={styleComplaint.dataTable}>
          <div className={styleComplaint.search}>
            <div>
              <span>Bookings</span>
            </div>
            <div>
              <input type="text" />
              <button>Search</button>
            </div>
          </div>
          <hr />

          <div className="filter"></div>

          <div className={styleComplaint.data} style={{ minHeight: '100vh' }}>
            <table>
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Booking Id</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone No.</th>
                  <th>Date/Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((booking, index) => {
                  const id = booking._id.slice(-5);
                  const status = booking.status !== '' ? booking.status : 'In Progress';
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>#{id}
                        <p style={{ marginTop: '0px', marginBottom: '0px', padding: '2px', textAlign: 'center' }}>
                          {status}
                        </p>
                      </td>
                      <td>{booking.userDetail.userName}</td>
                      <td>{booking.addressDetail.addressLine1} <br /> {booking.addressDetail.city} - {booking.addressDetail.pincode}</td>
                      <td>{booking.userDetail.phone}</td>
                      <td>{booking.serviceDate} <br /> {booking.orderTimeSlot}</td>
                      <td>
                        <button style={{ all: 'unset', fontSize: '1.5rem', color: '#001884', cursor: 'pointer', marginRight: '20px' }}>
                          <Link href={`/booking/${booking._id}`}>
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
                          onClick={() => handleEdit(booking._id)} // Pass booking to handleEdit function
                        >
                          <FaEdit />
                        </button>
                        <button onClick={()=>handleDeleteOrder(booking._id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Controls */}

          </div>

          <div className={styleComplaint.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? styleComplaint.activePage : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Popup */}
      {showPopup && (
        <div className={editPopupStyle.popup}>
          <div className={editPopupStyle.popupContent}>
            {/* Close button */}
            <button className={editPopupStyle.closeButton} onClick={handleClosePopup}>
              <IoMdClose />
            </button>
            {/* Edit form */}
            <h2>Edit Booking Status</h2>
            <div className={editPopupStyle.dropdown}>
              <label>Select Option</label>
              <select value={selectedStatus} onChange={handleStatusChange}>
                <option value="In Progress">In Progress</option>
                <option value="New">New</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled (Seller)">Cancelled (Seller)</option>
                <option value="Processing Payment">Processing Payment</option>
                <option value="Payment Failed">Payment Failed</option>
              </select>
            </div>
            <button className={editPopupStyle.saveButton} onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;
