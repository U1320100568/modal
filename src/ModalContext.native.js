import React from "react";
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";

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
  const animOpacity = React.useRef(new Animated.Value(0)).current;
  const _open = !!modal;

  React.useEffect(() => {
    (async () => {
      if (_open) {
        setOpen(true);
        Animated.timing(animOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(animOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => setOpen(false));
      }
    })();
  }, [_open]);

  React.useEffect(() => {
    setValues(initValues);
  }, [initValues]);

  return open ? (
    <Pressable
      onPress={onClose}
      style={{
        position: "absolute",
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Animated.View
        name="backdrop"
        style={{
          backgroundColor: "#0004",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          opacity: animOpacity,
        }}
      >
        {_open ? (
          <Pressable
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
            onPress={(e) => e.stopPropagation()}
          >
            <View
              name="header"
              style={{
                paddingTop: 8,
                paddingRight: 8,
                paddingLeft: 6,
                paddingBottom: 12,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ flex: 1, fontSize: 20 }}>{title}</Text>
              <TouchableOpacity onPress={() => onClose()}>
                <Image
                  source={require("../images/icon-x.png")}
                  resizeMode="contain"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </TouchableOpacity>
            </View>

            {render({ onSubmit, onChange: setValues, onClose, values })}
            {/* onSubmit: resolve (required), onChange: not ready to resolve, onClose: reject (wrap try catch required) */}
          </Pressable>
        ) : null}
      </Animated.View>
    </Pressable>
  ) : null;
}
