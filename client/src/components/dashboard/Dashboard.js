import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";
import DashboardActions from "../dashboard/DashboardActions";
import Education from "./Education";
import Experience from "./Experience";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Alert from "../layout/Alert";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentProfile();

    if (user && user.identifiers.isAdmin) {
      navigate("/admin");
    }
  }, [getCurrentProfile, user]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <section className="container">
        <Alert />
        <h1 className="large text-primary" style={{ marginBottom: "0" }}>
          Dashboard
        </h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <div>
              <section>
                {user.identifiers.isAdmin ? <Fragment></Fragment> : null}
                <Education
                  education={profile.education}
                  style={{ marginTop: "0.5rem" }}
                />
                <Experience
                  experience={profile.experience}
                  style={{ marginTop: "0.5rem" }}
                />
                <div className="my-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteAccount()}
                  >
                    <i className="fas fa-user-minus"></i>Delete my account
                  </button>
                </div>
              </section>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </section>
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
