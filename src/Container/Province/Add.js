import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Spinner, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { options, url } from "../../Util/Api";

function ProvinceAdd(props) {
  const [listCountry, setListCountry] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const countryUrl = `${url.country}?size=9999`;
  const provinceUrl = url.province;

  const fetchListCountry = async () => {
    const result = await axios(countryUrl, options);
    setListCountry(result.data.data);
    setShowLoading(false);
  };

  useEffect(() => {
    fetchListCountry();
  }, []);

  const save = (data) => {
    setShowLoading(true);
    const payload = {country_id: data.country_id, name: data.name };
    axios.post(provinceUrl, payload, options)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/province', {successMessage: true})
      }).catch((error) => setShowLoading(false));
  };

  const schema = yup.object({
    country_id: yup.string().required(),
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
          <Col><h5>Province Add</h5></Col>
        </Row>

        <Formik
          validationSchema={schema}
          onSubmit={save}
          initialValues={{
            country_id: '',
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
            const disabled = !isValid || values.country_id === '' || values.name === '';
            return (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3} className="text-right">
                    Country
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control as="select" size="sm" name="country_id" value={values.country_id} onChange={handleChange} isValid={touched.country_id && !errors.country_id} isInvalid={!!errors.country_id} >
                      <option value="">Choose...</option>
                      {
                        listCountry.map((item, index) => (
                          <option key={index} value={item.id}>{item.name}</option>
                        ))
                      }
                    </Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.country_id}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
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
                    <Button size="sm" type="submit" disabled={disabled} >Submit</Button> &nbsp;
                    <Button size="sm" type="button" variant="success" href="/province">Back</Button>
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

export default withRouter(ProvinceAdd);
