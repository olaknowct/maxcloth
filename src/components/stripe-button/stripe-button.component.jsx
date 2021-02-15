import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey =
        "pk_test_51IL779HTeZ2E9R9W6hgy6RMYfQ5aDqYlyA7NbdiMsyQ6wDWXKtGeErMpSkHZ4NOobNVwZZnjEhmsqruj32vXs24T00eXHvqmmV";

    const onToken = (token) => {
        console.log(token);
        alert("payment successful!!");
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
