import React from "react";

import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selectors";

import "./collection.styles.scss";

const CollectionPage = ({ match }) => {
    return (
        <div className="collection">
            <h2>Collection page</h2>
        </div>
    );
};

// 2nd argument of mapstatetoprops is our props we get from this component, match/history/path comes from the routes
const mapStateToProps = (state, ownProps) => {
    return {
        // setCollection returns a function
        collection: selectCollection(ownProps.match.params.collectionId)(state),
    };
};

export default connect(mapStateToProps)(CollectionPage);
