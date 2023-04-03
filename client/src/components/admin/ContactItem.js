import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteContact } from "../../actions/contact";

const ContactItem = ({
  contact: { _id, name, email, description },
  deleteContact,
}) => (
  <tr>
    <td>{name}</td>
    <td className="hide-sm">{email}</td>
    <td className="hide-sm">{description}</td>
    <td>
      <button className="btn btn-danger" onClick={() => deleteContact(_id)}>
        Delete
      </button>
    </td>
  </tr>
);

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default connect(null, { deleteContact })(ContactItem);
