import React, { useState, useEffect } from "react";
import { Alert } from 'react-bootstrap'

export default function AlertMessage(props) {
  const [show, setShow] = useState(props.show);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  if (show) {
    setTimeout(() => {
      setShow(false);
    }, 5000);
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
          Success
      </Alert>
    );
  } else {
    return null
  }
};
