import React from "react";

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
const gap = 15;
const radius = 20;

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

export default function Modal() {
  const { modal } = React.useContext(ModalContext);
  const {
    title,
    initValues,
    onSubmit,
    onClose,
    render = () => null,
    height = "auto",
    width = "auto",
  } = modal || {};
  const [values, setValues] = React.useState(initValues);
  const [open, setOpen] = React.useState(false);
  const [animOpacity, setAnimOpacity] = React.useState(0);
  const _open = !!modal;

  React.useEffect(() => {
    (async () => {
      if (_open) {
        setOpen(true);
        await delay(200);
        setAnimOpacity(1);
      } else {
        setAnimOpacity(0);
        await delay(200);
        setOpen(false);
      }
    })();
  }, [_open]);

  React.useEffect(() => {
    setValues(initValues);
  }, [initValues]);

  return open ? (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        // className={"backdrop " + (animOpacity === 1 ? "show" : "")}
        name="backdrop"
        style={{
          backgroundColor: "#0004",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 0.2s linear",
          opacity: animOpacity === 1 ? 1 : 0,
        }}
      >
        {_open ? (
          <div
            name="container"
            style={{
              width: width || "auto",
              height: height || "auto",

              backgroundColor: "#fff",
              flex: 0,
              minWidth: 300,
              maxHeight: "90%",
              borderRadius: radius,
              padding: gap,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              name="header"
              style={{
                padding: "8px 8px 12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>{title}</div>
              <img
                src="/icon-x.png"
                onClick={() => onClose()}
                style={{
                  cursor: "pointer",
                  width: 30,
                  height: 30,
                }}
              />
            </div>

            {render({ onSubmit, onChange: setValues, onClose, values })}
            {/* onSubmit: resolve (required), onChange: not ready to resolve, onClose: reject (wrap try catch required) */}
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
}
