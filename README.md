# Modal

The modal component which I used from UI kitkat library, is as `Component` format. Define a custom component like `XXXModal` and return `<Modal></Modal>` element from other library. Put this custom component where I want to used(`<XXXModal></XXXModal>`). And set a state to control visiblility of this modal(`const [visible, setVisible] = React.useState(false)`).  
But when I have a new function interaction with user, I have to create same flow. And lots of modal make lots of code that increase maintenance effort.
Use this, the only need to be implement thing is what buttons put in modal content (children) 🤗

# Usage

1. copy ModalContext.js to folder. Do it once on initialization
2. set ModalProvider at root layer (refer to example App.js). Do it once on initialization
   ```react
   import {  ModalProvider } from "./ModalContext";
   ...
   function App() {
      return (
        <div className="App">
          <ModalProvider>
            // ...children
          </ModalProvider>
        </div>
      );
    }
   ```
3. define a content of modal (refer to example SelectPlan.js, ChooseVariant.js)
4. use it
   import { ModalContext } from "./ModalContext";
   ...
   const { setModal } = React.useContext(ModalContext);
   ...

```react
async () => {
  try {
    let result = await setModal({
      title: "Title",
      initValues: state.variant,
      render: (args) => <ChooseVariant {...args} />,
      isAsync: true,
    });
    ...
  } catch (error) {}
}
```

# Defect

It's a singleton modal component. you can involk only once. It's not a big deal. There is a solution that show 2 steps modal (refer to SelectPlan.js ). you can put complex logic in content component independently.

# React Native

- react native use `ModalContext.native.js` instead.
- `icon-x.png` file is required for close button. Put it in the same folder where ModalContext.native.js is.
