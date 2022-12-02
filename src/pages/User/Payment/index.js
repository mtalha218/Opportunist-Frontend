import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CheckoutForm from "./CheckoutForm";
import "./index.css";

import { UseLoadingHook } from "hooks";
import { getRequest } from "services/apiClient";

import { payment, PaymentOrders } from "api/Order";
const stripePromise = loadStripe("pk_test_35p114pH8oNuHX72SmrvsFqh00Azv3ZaIA");

const Index = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const handleJob = async (values) => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { total },
      } = await getRequest(payment(), withJWT);
      console.log(total);
      setTotal(total);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    handleJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm total={total} setTotal={setTotal} />
    </Elements>
  );
};

export default Index;
