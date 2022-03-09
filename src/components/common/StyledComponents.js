import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => `${props.direction}`};
`;

export const FlexBox = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || ""};
  height: ${(props) => props.height || "auto"};
  width: ${(props) => props.width || "auto"};
  background: ${(props) => props.background};
  flex-wrap: ${(props) => props.flexWrap || "wrap"};
  position: ${(props) => props.position || "relative"};
  box-shadow: ${(props) => props.boxShadow || "0 0 4px rgba(0, 0, 0, 0.4)"};
  @media (max-width: 780px) {
    width: 100%;
  }
`;
