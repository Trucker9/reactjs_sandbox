import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  /* Portals:
  We use portal to place our JSX in specific place a specific place of DOM.
  its not a good practice to render the HTML that is related to modals, overlays etc. between actual webpage HTML.
  so we use portals. First we mark the location in index.html, then we use ReactDOM.createPortal
  */

  const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />;
  };

  const ModalOverly = (props) => {
    return (
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </Card>
    );
  };
  return (
    <React.Fragment>
      {
        /*
    first arg: React node that should be rendered.
    second arg: pointer to the container in the actual DOM.  */
        ReactDOM.createPortal(
          <Backdrop onConfirm={props.onConfirm} />,
          document.getElementById("backdrop-root")
        )
      }
      {ReactDOM.createPortal(
        <ModalOverly
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
