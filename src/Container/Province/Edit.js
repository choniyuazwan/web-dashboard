import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { options, url} from "../../Util/Api";
import {Card, Col, Row} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

function CountryEdit(props) {
  const [data, setData] = useState({});
  const [listCountry, setListCountry] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const countryUrl = `${url.country}?size=9999`;
  const provinceUrl = `${url.province}/${props.match.params.id}`;

  const fetchData = async () => {
    const result = await axios(provinceUrl, options);
    setData(result.data.data);
    setShowLoading(false);
  };

  const fetchListCountry = async () => {
    const result = await axios(countryUrl, options);
    setListCountry(result.data.data);
  };

  useEffect(() => {
    fetchData();
    fetchListCountry();
  }, []);

  const update = (data) => {
    setShowLoading(true);
    const payload = {country_id: data.country_id, name: data.name };
    axios.put(provinceUrl, payload, options)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/province', {successMessage: true});
      }).catch((error) => setShowLoading(false));
  };

  const schema = yup.object({
    country_id: yup.string().required(),
    name: yup.string().required()
  });

  const content = () => (
    <div>
      <Row>
        <Col><h5>Province Edit</h5></Col>
      </Row>
      <Formik
        validationSchema={schema}
        onSubmit={update}
        initialValues={{
          country_id: data.country_id,
          name: data.name
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
                        <option selected={item.id===data.country_id} key={index} value={item.id}>{item.name}</option>
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
                  <Form.Control size="sm" type="text" name="name" placeholder="Name" value={values.name} onChange={handleChange} isValid={touched.name && !errors.name} isInvalid={!!errors.name} />
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
