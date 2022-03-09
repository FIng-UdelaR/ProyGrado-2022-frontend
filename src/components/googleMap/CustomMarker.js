import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as ReactLogo } from "../../media/3d-printer-svgrepo-com.svg";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  padding: 5px;
  background-color: #f0c8c8;
  border: 2px solid #bfb3b3;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  transition: 0.3s ease-out;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  &:hover {
    z-index: 1;
    border: 3px solid #e78267;
    transform: scale(1.5) translate(-25%, -25%);
    transition: 0.3s ease-out;
    box-shadow: 0 0 5px 3px #e78267;
  }
`;

const Marker = ({ text, onClick }) => (
  <Wrapper alt={text} onClick={onClick}>
    <ReactLogo />
  </Wrapper>
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;
