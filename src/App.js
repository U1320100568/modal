import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ModalContext } from "./Context";
import Modal from "./Modal";

function App() {
  const [modal, setModal] = React.useState();

  return (
    <div className="App">
      <ModalContext.Provider value={{ modal, setModal }}>
        <div>
          <button
            onClick={() =>
              setModal({
                title: "This is Title",
                initValues: "123",
                onSubmit: () => {},
                onClose: () => setModal(false),
              })
            }
          >
            Open
          </button>
        </div>
        <Modal />
      </ModalContext.Provider>
    </div>
  );
}

export default App;
