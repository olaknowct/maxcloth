import React from "react";

import { Route } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import {
    selectIsCollectionFetching,
    selectIsCollectionsLoaded,
} from "../../redux/shop/shop.selectors";
import CollectionsOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

import { fetchCollectionStartAsync } from "../../redux/shop/shop.actions";

// import {
//     firestore,
//     convertCollectionsSnapshotToMap,
// } from "../../firebase/firebase.utils";

// import { updateCollections } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    // state = {
    //     loading: true,
    // };
    // unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { fetchCollectionStartAsync } = this.props;
        fetchCollectionStartAsync();
        // const { updateCollections } = this.props;
        // const collectionRef = firestore.collection("collections");
        // fetch(
        //     "https://firestore.googleapis.com/v1/projects/crwn-db-51c39/databases/(default)/documents/collections"
        // )
        //     .then((response) => response.json())
        //     .then((collections) => console.log(collections));
        // promises
        // collectionRef.get().then((snapshot) => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // });
        // subbscribpe/observe pattern
        // when an update happens this will be called, get all snapshot
        // when the shop page load this will run once bcozof component di mounth
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
        //     async (snapshot) => {
        //         const collectionsMap = convertCollectionsSnapshotToMap(
        //             snapshot
        //         );
        //         updateCollections(collectionsMap);
        //         this.setState({ loading: false });
        //     }
        // );
    }

    render() {
        const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
        // const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    // component={CollectionsOverview}
                    render={(props) => (
                        <CollectionOverviewWithSpinner
                            isLoading={isCollectionFetching}
                            {...props}
                        />
                    )}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    // component={CollectionPage}
                    render={(props) => (
                        <CollectionPageWithSpinner
                            isLoading={!isCollectionsLoaded}
                            {...props}
                        />
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    // syntax error if we used isFetching for isloading, so use collectionloaded intead
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()),
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateCollections: (collectionsMap) =>
//             dispatch(updateCollections(collectionsMap)),
//     };
// };

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
