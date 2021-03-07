import React from "react";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import CollectionPreview from "../collection-preview/collection-preview.component";

import { selectCollectionForPreview } from "../../redux/shop/shop.selectors";

import "./collection-overview.styles.scss";

const CollectionsOverview = ({ collections }) => {
    return (
        <div className="collection-overview">
            {collections.map(({ id, ...otherCollectionProps }) => {
                return <CollectionPreview key={id} {...otherCollectionProps} />;
            })}
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
