import React from "react";

import { Link, withRouter } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items, match }) => {
    return (
        <div className="collection-preview">
            <Link className="title" to={`${match.path}/${title.toLowerCase()}`}>
                {title.toUpperCase()}
            </Link>
            <div className="preview">
                {items
                    .filter((item, idx) => idx < 4)
                    .map((item) => {
                        return <CollectionItem key={item.id} item={item} />;
                    })}
            </div>
        </div>
    );
};

export default withRouter(CollectionPreview);
