import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey =
        "pk_test_51IL779HTeZ2E9R9W6hgy6RMYfQ5aDqYlyA7NbdiMsyQ6wDWXKtGeErMpSkHZ4NOobNVwZZnjEhmsqruj32vXs24T00eXHvqmmV";

    const onToken = (token) => {
        axios({
            url: "payment",
            method: "post",
            data: {
                amount: priceForStripe,
                token,
            },
        })
            .then((response) => {
                alert("payment successful");
            })
            .catch((error) => {
                console.log(error);
                alert(
                    "there was an issue with your payment, please make sure you provided credit cart"
                );
            });
    };

    return (
        <StripeCheckout
            label="Pay Now"
            name="Max Clothing"
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svga"
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
