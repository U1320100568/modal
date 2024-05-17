import React from "react";
import styled from "styled-components";

export default function SelectPlan(props) {
  const { values, onSubmit, onChange, onClose } = props;
  const [step, setStep] = React.useState(0);
  return (
    <Wrapper>
      {step === 0 ? (
        <React.Fragment>
          {["plan A", "plan B", "plan C"].map((key) => (
            <button
              key={key}
              className={values.plan === key ? "selected" : ""}
              onClick={() => onChange((prev) => ({ ...prev, plan: key }))}
            >
              {key}
            </button>
          ))}
          <button onClick={() => setStep(1)}>NEXT</button>
        </React.Fragment>
      ) : step === 1 ? (
        <React.Fragment>
          {["tier 1", "tier 2", "tier 3"].map((key) => (
            <button
              key={key}
              className={values.tier === key ? "selected" : ""}
              onClick={() => onChange((prev) => ({ ...prev, tier: key }))}
            >
              {key}
            </button>
          ))}
          <button onClick={() => setStep(0)}>PREV</button>
          <button onClick={() => onSubmit(values)}>CONFIRM</button>
        </React.Fragment>
      ) : null}
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
