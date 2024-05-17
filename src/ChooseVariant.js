import React from "react";
import styled from "styled-components";

export default function ChooseVariant(props) {
  const { values, onSubmit, onChange } = props;
  return (
    <Wrapper>
      {["variant A", "variant B", "variant C"].map((key) => (
        <button
          key={key}
          className={values === key ? "selected" : ""}
          onClick={() => onSubmit(key)}
        >
          {key}
        </button>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, auto));
  grid-gap: 10px;

  button {
    padding: 14px;
    border: 1px solid #ddd;
    color: #707070;
    border-radius: 8px;
  }

  & button.selected {
    background-color: #555;
  }
`;
