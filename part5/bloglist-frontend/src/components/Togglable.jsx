import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
  const [isVisible, setIsVisible] = useState(false);

  const formIsShown = { display: isVisible ? "" : "none" };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={formIsShown}>{props.children}</div>
      <button onClick={() => setIsVisible(!isVisible)}>{!isVisible ? 'Add new blog' : 'Cancel'}</button>
    </div>
  );
});

export default Togglable;
