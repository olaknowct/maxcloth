import React from "react";

import { Route } from "react-router-dom";

import { connect } from "react-redux";

import CollectionsOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

import {
    firestore,
    convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import { updateCollections } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection("collections");
        // when an update happens this will be called, get all snapshot
        // when the shop page load this will run once bcozof component di mounth
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
            async (snapshot) => {
                const collectionsMap = convertCollectionsSnapshotToMap(
                    snapshot
                );
                updateCollections(collectionsMap);
            }
        );
    }

    render() {
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverview}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionPage}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCollections: (collectionsMap) =>
            dispatch(updateCollections(collectionsMap)),
    };
};

export default connect(null, mapDispatchToProps)(ShopPage);
