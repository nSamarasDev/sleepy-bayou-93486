import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Alert from "../layout/Alert";
import { getProfiles } from "../../actions/profile";
import { getContacts } from "../../actions/contact";
import AdminActions from "./AdminActions";
import ProfileItem from "./ProfileItem";
import ContactItem from "./ContactItem";

const AdminDashboard = ({
  getProfiles,
  getContacts,
  auth: { user },
  profile: { profiles, loading },
  contact: { contacts, loading: contactLoading },
}) => {
  useEffect(() => {
    getProfiles();
    getContacts();
  }, [getProfiles, getContacts]);

  return loading || contactLoading || !contacts ? (
    <Spinner />
  ) : (
    <>
      <section className="container">
        <Alert />
        <h1 className="large text-primary">Admin Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        <AdminActions />
        <section className="dashboard-container">
          <h1 className="lead text-dark">Profile list</h1>
          <hr />
          <table className="table" style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th className="hide-sm">Company</th>
                <th className="hide-sm">Website</th>
                <th></th>
              </tr>
            </thead>

            <tbody style={{ background: "#333", color: "#fff" }}>
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <tr>
                  <td>No profiles found</td>
                </tr>
              )}
            </tbody>
          </table>
          <h1 className=" lead text-dark" style={{ marginTop: "75px" }}>
            Contact list
          </h1>
          <hr />
          <table className="table" style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th className="hide-sm">Email</th>
                <th className="hide-sm">Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody style={{ background: "#333", color: "#fff" }}>
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <ContactItem key={contact._id} contact={contact} />
                ))
              ) : (
                <tr>
                  <td>No contacts found</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
};

AdminDashboard.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getContacts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  contact: state.contact,
});

export default connect(mapStateToProps, { getContacts, getProfiles })(
  AdminDashboard
);
