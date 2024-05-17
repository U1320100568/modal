import React from "react";
import styled from "styled-components";

export default function SelectPlan(props) {
  const { values, onSubmit, onChange, onClose } = props;
  const [step, setStep] = React.useState(0);
  return (
    <Wrapper>
      {step === 0
        ? ["plan A", "plan B", "plan C"].map((key) => (
            <button
              key={key}
              className={values.plan === key ? "selected" : ""}
              onClick={() => onChange((prev) => ({ ...prev, plan: key }))}
            >
              {key}
            </button>
          ))
        : step === 1
        ? ["tier 1", "tier 2", "tier 3"].map((key) => (
            <button
              key={key}
              className={values.tier === key ? "selected" : ""}
              onClick={() => onChange((prev) => ({ ...prev, tier: key }))}
            >
              {key}
            </button>
          ))
        : null}
      {step === 0 ? (
        <button onClick={() => setStep(1)} style={{ gridColumn: "3 / 4" }}>
          NEXT
        </button>
      ) : step === 1 ? (
        <React.Fragment>
          <button onClick={() => setStep(0)} style={{ gridColumn: "2 / 3" }}>
            PREV
          </button>
          <button
            onClick={() => onSubmit(values)}
            style={{ gridColumn: "3 / 4" }}
          >
            CONFIRM
          </button>
        </React.Fragment>
      ) : null}
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
