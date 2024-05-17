import React from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import { ModalContext, ModalProvider } from "./Context";

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
      <div>
        <h4>RESULT</h4>
        <div style={{ whiteSpace: "pre" }}>
          {JSON.stringify(state, null, 2)}
        </div>
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
        async select
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
        async complex select
      </button>
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
  button {
    // padding: 14px;
    border: 2px solid #ddd;
    color: #707070;
    border-radius: 8px;
  }
`;

export default App;
