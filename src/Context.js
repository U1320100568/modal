import React from "react";

//  put in other kind global state management instead as well.
export const ModalContext = React.createContext({
  modal: null,
  setModal: () => {},
});
