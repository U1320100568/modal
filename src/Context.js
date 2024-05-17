import React from "react";
import Modal from "./Modal";

//  put in other kind global state management instead as well.
export const ModalContext = React.createContext({
  modal: null,
  setModal: () => {},
});

export function ModalProvider(props) {
  const [modal, _setModal] = React.useState();

  const setModal = React.useCallback(
    async ({
      title = "",
      render,
      initValues,
      height,
      width,
      isAsync = false,
    }) => {
      if (isAsync) {
        return new Promise((resolve, reject) => {
          _setModal({
            title,
            width,
            height,
            initValues,
            onSubmit: (data) => {
              resolve(data);
              _setModal(null);
            },
            onClose: () => {
              reject();
              _setModal(null);
            },
            render,
          });
        });
      } else {
        _setModal({
          title,
          width,
          height,
          initValues,
          onSubmit: (data) => {
            _setModal(null);
          },
          onClose: () => {
            _setModal(null);
          },
          render,
        });
      }
    },
    []
  );

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {props.children}
      <Modal />
    </ModalContext.Provider>
  );
}
