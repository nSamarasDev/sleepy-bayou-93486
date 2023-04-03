import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount } from "../../actions/profile";

const ProfileItem = ({
  profile: {
    user: { _id, name },
    company,
    website,
  },
  deleteAccount,
}) => (
  <tr>
    <td>{name}</td>
    <td className="hide-sm">{company}</td>
    <td className="hide-sm">{website}</td>
    <td>
      <button className="btn btn-danger" onClick={() => deleteAccount()}>
        Delete
      </button>
    </td>
  </tr>
);

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

export default connect(null, { deleteAccount })(ProfileItem);
