"use client"
import React, { useContext, useState, useEffect } from "react";
import DataContext from "@/app/Data/DataContext";
import styleBooking from "../../style/bookingDetail.module.css";
import Link from "next/link";
import styles from "./popup.module.css"; // Create a CSS module for the popup styling
import { FaWhatsapp } from "react-icons/fa";
const BookingDetail = ({ params }) => {
    const [orderDetails, setOrderDetails] = useState();
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { updatedBooking, fetchAllBooking, singleProduct, fetchProductById } = useContext(DataContext);
    const [taxesAmount, setTaxesAmounnt] = useState()
    const bookingId = params.bookingDetail;

    useEffect(() => {
        if (bookingId && updatedBooking) {
            const selectedBooking = updatedBooking.find(booking => booking._id === bookingId);
            setOrderDetails(selectedBooking);
        }
    }, [bookingId, updatedBooking]);


    useEffect(() => {
        if (orderDetails && orderDetails.totalCartPrice) {
            pricingCalculation(orderDetails.totalCartPrice);
        }
    }, [orderDetails]);


    const pricingCalculation = (itemPrice) => {
        let commissionCharge;
        let eighteenPercentCharge;

        if (itemPrice <= 1000) {
            commissionCharge = 1000 * 0.10;
            eighteenPercentCharge = Math.round(commissionCharge * 0.18) + 50;
        } else if (itemPrice > 1000 && itemPrice <= 2000) {
            commissionCharge = 2000 * 0.15;
            eighteenPercentCharge = Math.round(commissionCharge * 0.18) + 50;
        }
        else if (itemPrice > 2000 && itemPrice <= 3000) {
            commissionCharge = 3000 * 0.20;
            eighteenPercentCharge = Math.round(commissionCharge * 0.18) + 50;
        }
        else if (itemPrice > 3000) {
            commissionCharge = itemPrice * 0.20;
            eighteenPercentCharge = Math.round(commissionCharge * 0.18) + 100;
        }

        setTaxesAmounnt(eighteenPercentCharge)
    }

    useEffect(() => {
        fetchAllBooking()
    }, [])

    useEffect(() => {
        if (orderDetails && orderDetails.userDetail) {
            // console.log(orderDetails.userDetail.userName);
        }

        // console.log(orderDetails);
    }, [orderDetails]);

    const handleProductClick = async (id) => {
        // setSelectedProduct(product);
        console.log(id)
        let a = await fetchProductById(id)
        console.log(a)
        // console.log(singleProduct)
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
        setSelectedProduct(null);
    };


    const sendReviewMessage = (name, number)=>{
        const userName = name.split(' ')[0]
        const whatsappNumber = `91${number}`

        const url = `https://live-mt-server.wati.io/100971/api/v1/sendTemplateMessage?whatsappNumber=${whatsappNumber}`;
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json-patch+json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMDRjNDIzMS00ZGE2LTRhNjctYTk3Yy01NTcyMTg0YjJhYzciLCJ1bmlxdWVfbmFtZSI6ImluZm9AbWV0cm9saXRlc29sdXRpb25zLmNvbSIsIm5hbWVpZCI6ImluZm9AbWV0cm9saXRlc29sdXRpb25zLmNvbSIsImVtYWlsIjoiaW5mb0BtZXRyb2xpdGVzb2x1dGlvbnMuY29tIiwiYXV0aF90aW1lIjoiMDYvMDQvMjAyNCAxMToxNzo0MiIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJ0ZW5hbnRfaWQiOiIxMDA5NzEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.6mt_i42nDz5adKlXAhWRIV4fn866ZxxBbY8zIKhd4yI'
          },
          body: JSON.stringify({
            template_name: "app_review_home_service",
            broadcast_name: "app_review_home_service",
            parameters: [
              {
                name: "name",
                value: userName
              }
            ]
          })
        };
      
        fetch(url, options)
          .then(res => res.json())
          .then(json => console.log(json))
          .catch(err => console.error('error:' + err));


          alert("Message Sent")

    }

    const id = bookingId.slice(-5);
    return (
        <>
            <div style={{ minHeight: '100vh' }}>
                <div style={{display:'flex', justifyContent:'space-evenly', marginRight:'20px', marginTop:'10px'}}>

                <button style={{ all:'unset',background:'#007500', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px', }}><Link href={`/booking/pdfbill/${bookingId}`} style={{all:'unset', color:'#fff'}}>Generate Pdf</Link> </button>

                
                <button style={{ all:'unset',background:'#007500', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px', color:'#fff', display:'flex', justifyContent:'center', alignItems:'center' }} onClick={()=> sendReviewMessage(orderDetails.userDetail.userName, orderDetails.userDetail.phone)}> <FaWhatsapp  size={20} style={{marginRight:'10px'}} /> Send Review</button>
                
                </div>

                <div className={styleBooking.mainBox}>
                    <div>
                        <h1>Booking Details</h1>
                        <p>Details of the users booking including items and address.</p>
                        <p>#{id}</p>
                    </div>



                    {orderDetails && (


                    <>
                        <div>
                            <div><span>User Name</span></div>
                            <div><span>{orderDetails.userDetail.userName}</span></div>
                        </div>
                        <div>
                            <div><span>Phone No.</span></div>
                            <div><span>{orderDetails.userDetail.phone}</span></div>
                        </div>
                        <div>
                            <div><span>Email</span></div>
                            <div><span>{orderDetails.userDetail.emailId}</span></div>
                        </div>
                        <div>
                            <div><span>Service Date</span></div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{orderDetails.serviceDate} </span>
                                <span>({orderDetails.orderTimeSlot})</span>
                            </div>
                        </div>
                        <div>
                            <div><span>Order Date</span></div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{orderDetails.orderDate}</span>
                                <span>{orderDetails.orderTime}</span>
                            </div>
                        </div>
                        <div>
                            <div><span>Payment Method</span></div>
                            <div><span>{orderDetails.paymentMethod}</span></div>
                        </div>
                        <div>
                            <div><span>Ordered Item</span></div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {orderDetails.allOrderedCart && orderDetails.allOrderedCart.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <span
                                            style={{ width: '60%', cursor: 'pointer', color: '#00456e' }}
                                            onClick={() => handleProductClick(orderDetails.allCartItem[index].productId)}
                                        >
                                            {item.productName}
                                        </span>
                                        <span>{item.quantity}</span>
                                        <span>₹{item.discountedPrice}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div><span>Address Detail</span></div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>{orderDetails.addressDetail.addressLine1}</span>
                                <span>{orderDetails.addressDetail.addressLine2}</span>
                                <span>{orderDetails.addressDetail.landmark}</span>
                                <span>{orderDetails.addressDetail.city}</span>
                                <span>{orderDetails.addressDetail.state} - {orderDetails.addressDetail.pincode}</span>
                            </div>
                        </div>
                        <div>
                            <div><span>Receiver Name</span></div>
                            <div><span>{orderDetails.addressDetail.receiverName} </span></div>
                        </div>
                        <div>
                            <div><span>Receiver Phone</span></div>
                            <div><span>{orderDetails.addressDetail.receiverPhone}</span></div>
                        </div>
                        <div>
                            <div><span>Item Total</span></div>
                            <div><span>₹{orderDetails.totalCartPrice}</span></div>
                        </div>
                        <div>
                            <div><span>Taxes and Fee</span></div>
                            <div><span>₹{taxesAmount}</span></div>
                        </div>
                        <div>
                            <div><span>Slot Fee</span></div>
                            <div><span>₹{orderDetails.totalPriceWithSlot - orderDetails.totalCartPrice - taxesAmount}</span></div>
                        </div>
                        <div>
                            <div><span>Total Price</span></div>
                            <div><span>₹{orderDetails.totalPriceWithSlot}</span></div>
                        </div>
                    </>
                    )}
                </div>
            </div>
            {popupVisible && (
                <div className={styles.popupOverlay} onClick={closePopup}>
                    <div className={styles.popupContent} onClick={e => e.stopPropagation()}>
                        <button onClick={closePopup} className={styles.closeButton}>X</button>
                        <h2>{singleProduct.name}</h2>
                        <p>{singleProduct.description.split('*').map((item, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <br />} {/* Add <br> after each * except the first one */}
                                {item}
                            </React.Fragment>
                        ))}</p>

                    </div>
                </div>
            )}
        </>
    );
};

export default BookingDetail;
