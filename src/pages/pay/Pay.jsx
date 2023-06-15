import React, { useEffect, useState } from "react";
import "./pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest.js";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm.jsx";
const stripePromise = loadStripe(
  "pk_test_51MyDOnSIoOC2v36p5KBXGl2OR9v2b4pAW7ynRtg4ok5YXPRtyweIZ3eyAHhURosaRk3BS8hB3mpdFJfF0CdAdrZ200sYfOl3JR"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      await newRequest.post(
        `/orders/create-payment-intent/${id}`
      ).then(res => {
        setClientSecret(res.data.clientSecret);
      }).catch(err => {
        console.log(err);
      })
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
      <div className="payme">

        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    )}
  </div>;
};

export default Pay;