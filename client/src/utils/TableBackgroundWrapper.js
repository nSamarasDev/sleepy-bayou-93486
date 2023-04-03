import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TableBackground = styled.div`
  background-color: #333;
  color: #fff;
  & tr {
    border: 1px solid #fff;
  }
`;

const TableBackgroundWrapper = ({ children }) => {
  return <TableBackground>{children}</TableBackground>;
};

TableBackgroundWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableBackgroundWrapper;
