import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  return (
    <div>
      <div className="post-form">
        <div className="bg-dark p">
          <h3>Leave a Comment</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            addComment(postId, { text });
            setText("");
          }}
        >
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Write your comment here"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <input
            type="submit"
            className="btn btn-primary my-1"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
