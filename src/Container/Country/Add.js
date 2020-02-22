import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { options, url } from "../../Util/Api";
import * as yup from "yup";
import {Formik} from "formik";

function CountryAdd(props) {
  const [showLoading, setShowLoading] = useState(false);

  const apiUrl = url.country;

  const save = (data) => {
    setShowLoading(true);
    const payload = { name: data.name };
    axios.post(apiUrl, payload, options)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/country', {successMessage: true})
      }).catch((error) => setShowLoading(false));
  };

  const schema = yup.object({
    name: yup.string().required()
  });

  return (
    <div>
      {showLoading &&
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }

      <Card body>
        <Row>
          <Col><h5>Country Add</h5></Col>
        </Row>

        <Formik
          validationSchema={schema}
          onSubmit={save}
          initialValues={{
            name: '',
          }}
        >
          {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => {
            const disabled = !isValid || values.name === '';
            return (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="formHorizontalName">
                  <Form.Label column sm={3} className="text-right">
                    Name
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control size="sm" type="text" name="name" id="name" placeholder="Name" value={values.name} onChange={handleChange} isValid={touched.name && !errors.name} isInvalid={!!errors.name} />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col sm={{ offset: 3 }}>
                    <Button size="sm" type="submit" disabled={disabled}>Submit</Button> &nbsp;
                    <Button size="sm" type="button" variant="success" href="/country">Back</Button>
                  </Col>
                </Form.Group>
              </Form>
            )
          }}
        </Formik>
      </Card>
    </div>
  );
}

export default withRouter(CountryAdd);
