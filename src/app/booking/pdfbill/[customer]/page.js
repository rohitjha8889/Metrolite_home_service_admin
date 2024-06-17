"use client"
import React, { useRef, useContext, useState, useEffect } from "react";
import DataContext from "@/app/Data/DataContext";
import html2pdf from "html2pdf.js";
import pdfStyle from "../../../style/invoiceDesign.module.css"
import Image from "next/image";
import Logo from "../../../../../public/logo1.png";
import Logo1 from "../../../../../public/logo.png"
import Signature from "../../../../../public/signature.jpeg"



const Billpdf = ({ params }) => {
    const pdfRef = useRef(null);

    const [orderDetails, setOrderDetails] = useState()
    const [taxesAmount, setTaxesAmounnt] = useState()
    const { updatedBooking } = useContext(DataContext);
    const bookingId = params.customer;


    useEffect(() => {
        if (orderDetails && orderDetails.totalCartPrice) {
            pricingCalculation(orderDetails.totalCartPrice);
        }
    }, [orderDetails]);


    useEffect(() => {
        if (bookingId && updatedBooking) {
            const selectedBooking = updatedBooking.find(booking => booking._id === bookingId);
            setOrderDetails(selectedBooking);
        }


    }, [bookingId, updatedBooking]);

    useEffect(() => {
        if (orderDetails && orderDetails.userDetail) {
            console.log(orderDetails);
        }
    }, [orderDetails])



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

    const generatePdf = () => {
        const element = pdfRef.current;

        if (element) {
            html2pdf()
                .from(element)
                .set({
                    margin: 0.2,
                    filename: 'bill.pdf',
                    html2canvas: {
                        scale: 1.2,
                        useCORS: true, // Handle cross-origin images
                    },
                    image: { type: 'jpeg', quality: 0.98 },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                })
                .toPdf()
                .get('pdf')
                .then(function (pdf) {
                    const pdfUrl = URL.createObjectURL(pdf.output('blob'));
                    window.open(pdfUrl, '_blank');
                });
        }
    };

    const downloadPdf = () => {
        const element = pdfRef.current;

        if (element) {
            html2pdf()
                .from(element)
                .set({
                    margin: 0.2,
                    filename: 'bill.pdf',
                    html2canvas: {
                        scale: 1.2,
                        useCORS: true, // Handle cross-origin images
                    },
                    image: { type: 'jpeg', quality: 0.98 },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                })
                .save();
        }
    };

    const id = bookingId.slice(-5);
    let grandTotal = 0
    return (
        <>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    <button onClick={generatePdf}>View PDF</button>
                    <button onClick={downloadPdf}>Download PDF</button>
                </div>



                <div ref={pdfRef} className={pdfStyle.pdfBox}>
                    {orderDetails && (
                        <>
                            <div className={pdfStyle.billHeader}>
                                <div style={{ width: '80px', height: '80px' }}>
                                    <img src={Logo.src} style={{ width: '80px', height: '80px' }} />

                                </div>

                                <div>
                                    <h2>BILL OF SUPPLY</h2>
                                    <h1>Metrolite Home Service</h1>
                                    <span>79, J-Ext, Guru Ram Das Nagar,, Laxmi Nagar Delhi</span>
                                    <span>GSTIN : 07AANCM7166P1ZJ</span>
                                </div>

                                <span>Orginal Copy</span>
                            </div>



                            <div className={pdfStyle.billDetails}>
                                <div>
                                    <div>
                                        <div>

                                            <span>Order Id </span>
                                        </div>
                                        <div>

                                            <span>: #{id} </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div>

                                            <span>Date</span>
                                        </div>
                                        <div>

                                            <span>: {orderDetails.orderDate}</span>
                                        </div>
                                    </div>
                                    <div>
                                        {/* <div>

                                    <span>Place of Supply </span>
                                </div>
                                <div>

                                    <span>:  Invoice no</span>
                                </div> */}
                                    </div>
                                    <div>
                                        {/* <div>

                                    <span>Reverse Charge</span>
                                </div>
                                <div>

                                    <span>:  N</span>
                                </div> */}
                                    </div>

                                </div>



                            </div>

                            <div className={pdfStyle.customerDetail}>
                                <div>
                                    <div>

                                        <span>Billed to  </span>
                                        <span>:</span>
                                    </div>
                                    <span>{orderDetails.userDetail.userName}</span>
                                    <span>{orderDetails.addressDetail.addressLine1}</span>
                                    <span>{orderDetails.addressDetail.addressLine2}, </span>
                                    <span>{orderDetails.addressDetail.city} {orderDetails.addressDetail.state} - {orderDetails.addressDetail.pincode}</span>

                                    <div>

                                        <span>GSTIN / UIN</span>
                                        <span>:</span>
                                    </div>

                                </div>
                                <div>
                                    <div>

                                        <span>Billed to  </span>
                                        <span>:</span>
                                    </div>
                                    <span>{orderDetails.userDetail.userName}</span>
                                    <span>{orderDetails.addressDetail.addressLine1}</span>
                                    <span>{orderDetails.addressDetail.addressLine2}, </span>
                                    <span>{orderDetails.addressDetail.city} {orderDetails.addressDetail.state} - {orderDetails.addressDetail.pincode}</span>

                                    <div>

                                        <span>GSTIN / UIN</span>
                                        <span>:</span>
                                    </div>

                                </div>
                            </div>
                            <div className={pdfStyle.productDetail}>


                                <table>
                                    <tr>

                                        <th>S.N</th>
                                        <th>Description of Goods</th>
                                        <th>HSN/SAC Code </th>
                                        <th>Qty.</th>
                                        <th>Unit</th>
                                        <th>Price</th>
                                        <th>Amount(₹)</th>
                                    </tr>
                                    <tbody>




                                        {orderDetails.allOrderedCart.map((product, index) => {
                                            let itemPrice = product.discountedPrice / product.quantity;
                                            grandTotal = grandTotal + 1
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{product.productName}</td>
                                                    <td></td>
                                                    <td>{product.quantity}</td>
                                                    <td>Units</td>
                                                    <td>₹{itemPrice}</td>
                                                    <td>₹{product.discountedPrice}</td>
                                                </tr>


                                            );
                                        })}



                                        <tr>
                                            <td></td>
                                            <td>Taxes and Fee</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>₹{taxesAmount}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>Slot Fee</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>₹{orderDetails.totalPriceWithSlot - orderDetails.totalCartPrice - taxesAmount}</td>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>

                            <div className={pdfStyle.totalBox}>
                                <div>
                                    <span>Grand Total</span>
                                    <span>{grandTotal}</span>
                                </div>

                                <div>
                                    <span>₹</span>
                                    <span>{orderDetails.totalPriceWithSlot}</span>
                                </div>
                            </div>

                            <div className={pdfStyle.taxDetail}>
                                <div>
                                    <span>Tax Rate</span>
                                    <span>Nil Rated</span>
                                </div>
                                <div>
                                    <span>Taxable Amount</span>
                                    <span>₹{orderDetails.totalPriceWithSlot}</span>
                                </div>
                                <div>
                                    <span>IGST Amt.</span>
                                    <span>--</span>
                                </div>
                                <div>
                                    <span>Total Tax</span>
                                    <span>0.00</span>
                                </div>

                            </div>

                            <div className={pdfStyle.priceInWord}>
                                <span>Rupees Eight Hundred Ninety Eight Only</span>
                            </div>
                            <div className={pdfStyle.termsBox}>
                                <div>
                                    <span>Terms & Conditions</span>
                                    <span>E.& O.E</span>
                                    <span>1.Goods once sold will not be taken back</span>
                                    <span>2. Interest @18% p.a will be charged if the payment is not made with the stipulated time.</span>
                                    <span>3. Subject to Delhi Jurisdiction Only </span>
                                </div>
                                <div>
                                    <div>
                                        <span>Receivers Signature :</span>
                                    </div>

                                    <div>
                                        <span>for Metrolite Home Service</span>
                                        <img src={Signature.src} width={80} />
                                        <span>Authorised Signatory</span>
                                    </div>
                                </div>
                            </div>
                        </>

                    )}

                </div>
            </div>

        </>
    );
};

export default Billpdf;
