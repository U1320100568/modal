import React from "react";
import styled from "styled-components";
import { ModalContext } from "./Context";

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
const gap = 15;
const radius = 20;

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
    <Wrapper onClick={onClose}>
      <div className={"backdrop " + (animOpacity === 1 ? "show" : "")}>
        {_open ? (
          <div
            className="container"
            style={{ width: width || "auto", height: height || "auto" }}
          >
            <div className="header">
              <div style={{ flex: 1 }}>{title}</div>
              <img
                src="/icon-x.png"
                onClick={() => onClose()}
                className="close-btn"
              />
            </div>

            {render({ onSubmit, onChange: setValues, onClose, values })}
            {/* onSubmit: resolve (required), onChange: not ready to resolve, onClose: reject (wrap try catch required) */}
          </div>
        ) : null}
      </div>
    </Wrapper>
  ) : null;
}

const Wrapper = styled.div`
  position: absolute;
  right: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;

  & > .backdrop {
    background-color: #0004;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s linear;
  }

  & > .backdrop.show {
    opacity: 1;
  }

  & .container {
    background-color: #fff;
    flex: 0;
    min-width: 300px;
    max-height: 90%;
    border-radius: ${radius}px;
    padding: ${gap}px;

    & > .header {
      padding: 12px 8px;
      display: flex;
      align-items: center;

      & > .close-btn {
        cursor: pointer;
        width: 30px;
        height: 30px;
      }
    }
  }
`;
