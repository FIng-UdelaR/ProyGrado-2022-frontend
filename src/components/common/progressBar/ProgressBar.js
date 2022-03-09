import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  background-color: rgb(233, 233, 233);
  border-radius: 0.5rem;
  height: 10px;
  width: ${(props) => `${props.width}px`};
  .progress {
    background-color: rgb(62, 122, 235);
    height: 10px;
    border-radius: 1rem;
    transition: 1s ease;
    transition-delay: 0.5s;
  }

  progress[value] {
    width: ${(props) => props.width};
    appearance: none;
    height: 10px;
    border: none;
    border-radius: 20px;
    -webkit-appearance: none;
    -moz-appearance: none;

    ::-webkit-progress-bar {
      height: 10px;
      border-radius: 20px;
      background-color: #eee;
    }

    ::-webkit-progress-value {
      height: 10px;
      border-radius: 20px;
      background-color: ${(props) => props.color};
    }

    ::-moz-progress-bar {
      height: 10px;
      border-radius: 20px;
      background-color: ${(props) => props.color};
    }
  }
`;

const ProgressBar = (props) => {
  const { percent, max, color, width } = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(percent * width);
  });

  return (
    <Container color={color} width={width}>
      <div style={{ width: `${value}px` }} className="progress" />
    </Container>
  );
};

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
  max: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.number,
};

ProgressBar.defaultProps = {
  max: 100,
  color: "#ff7979",
  width: 200,
};

export default ProgressBar;
