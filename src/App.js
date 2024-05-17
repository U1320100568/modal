import React from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import { ModalContext, ModalProvider } from "./ModalContext";

import SelectPlan from "./SelectPlan";
import ChooseVariant from "./ChooseVariant";

function Content() {
  const { setModal } = React.useContext(ModalContext);
  const [state, setState] = React.useState({
    variant: "",
    plan: "",
    tier: "",
  });
  return (
    <Wrapper>
      <div className="content">
        <div className="result">
          <h4>RESULT</h4>
          {Object.keys(state).map((key) => (
            <div key={key}>
              <span style={{ display: "inline-block", width: 100 }}>{key}</span>
              <span>{state[key]}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() =>
            setModal({
              title: "This is Title",
            })
          }
        >
          Open
        </button>

        <button
          onClick={async () => {
            try {
              let variant = await setModal({
                title: "Select Variant",
                initValues: state.variant,
                render: (args) => <ChooseVariant {...args} />,
                isAsync: true,
              });
              setState((prev) => ({ ...prev, variant }));
            } catch (error) {}
          }}
        >
          Async Select
        </button>

        <button
          onClick={async () => {
            try {
              let resp = await setModal({
                title: "Choose plan",
                initValues: { plan: state.plan, tier: state.tier },
                render: (args) => <SelectPlan {...args} />,
                isAsync: true,
              });

              setState((prev) => ({ ...prev, ...resp }));
            } catch (error) {}
          }}
        >
          Async Complex Select
        </button>
      </div>
    </Wrapper>
  );
}

function App() {
  return (
    <div className="App">
      <ModalProvider>
        <Content />
      </ModalProvider>
    </div>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > .content {
    margin-top: 100px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;

    > .result {
      padding: 10px 20px 30px;
      background-color: #efefef;
      border-radius: 8px;
      grid-column: 1 / 4;
    }
  }

  & button {
    padding: 14px;
    border: 1px solid #ddd;
    color: #707070;
    border-radius: 8px;
  }
`;

export default App;
