import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { UseLoadingHook } from "hooks";
import { getRequest, postRequest } from "services/apiClient";

import { payment, PaymentOrders } from "api/Order";
import Swal from "sweetalert2";
const CheckoutForm = ({ total, setTotal }) => {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      Swal.fire({
        text: "Payment Withdrawn Successfully",
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      setTotal(0);
      const withJWT = true;
      const values = {};
      try {
        await postRequest(PaymentOrders(), values, withJWT);
        console.log(total);
      } catch (e) {}
      console.log("[PaymentMethod]", paymentMethod);
      // ... SEND to your API server to process payment intent
    }
  };
  return (
    <>
      <center>
        <h4>You have {total} dollars in your Account</h4>

        <h4>Do you Want to Withdraw</h4>
        <h4>Enter Your Card Details</h4>
      </center>
      <div
        style={{
          padding: "3rem",
        }}
      >
        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <form
            style={{
              display: "block",
              width: "100%",
            }}
            onSubmit={handleSubmit}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardElement
                className="card"
                options={{
                  style: {
                    base: {
                      backgroundColor: "white",
                    },
                  },
                }}
              />
              <button
                className="pay-button"
                disabled={total === 0 ? true : false}
              >
                {"Pay"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default CheckoutForm;
