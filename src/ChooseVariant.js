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
  & > button {
  }

  & > button.selected {
    background-color: #555;
  }
`;
