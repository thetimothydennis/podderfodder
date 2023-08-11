import React from "react";
import { object, func } from "prop-types";

function DeleteButton (props) {
    const { item, handleDeleteClick } = props;
    return (
            <div
				className="col-sm"
				id={item.podcasts._id}
				onClick={handleDeleteClick}>
				<button
					id="-6"
					type="button"
					className="btn btn-dark"
					value={item.podcasts._id}
					onClick={handleDeleteClick}>
					Delete podcast
				</button>
			</div>
    )
}

DeleteButton.propTypes = {
    item: object,
    handleDeleteClick: func
}

export default DeleteButton;