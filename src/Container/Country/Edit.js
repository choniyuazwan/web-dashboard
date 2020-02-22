import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { options, url} from "../../Util/Api";
import {Card, Col, Row} from "react-bootstrap";
import * as yup from "yup";
import {Formik} from "formik";

function CountryEdit(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);

  const apiUrl = `${url.country}/${props.match.params.id}`;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl, options);
      setData(result.data.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const update = (data) => {
    setShowLoading(true);
    const payload = { name: data.name };
    axios.put(apiUrl, payload, options)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/country', {successMessage: true});
      }).catch((error) => setShowLoading(false));
  };

  const schema = yup.object({
    name: yup.string().required()
  });

  const content = () => (
    <div>
      <Row>
        <Col><h5>Country Edit</h5></Col>
      </Row>
      <Formik
        validationSchema={schema}
        onSubmit={update}
        initialValues={{
          name: data.name,
        }}
        enableReinitialize={true}
      >
        {({
            handleSubmit,
            handleChange,
            values,
            touched,
            isValid,
            errors,
          }) => {
          const disabled = !isValid || values.name === '';
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group as={Row}>
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
    </div>
  );

  const loading = () => (
    <div className="d-flex justify-content-center">
      <Spinner animation="border"/>
    </div>
  );

  return (
    <div>
      <Card body>
        { showLoading ? loading() : content() }
      </Card>
    </div>
  );
}

export default withRouter(CountryEdit);
