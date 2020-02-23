import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Spinner, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { options, url } from "../../Util/Api";

function RegencyAdd(props) {
  const [listProvince, setListProvince] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const provinceUrl = `${url.province}?size=9999`;
  const regencyUrl = url.regency;

  const fetchListProvince = async () => {
    const result = await axios(provinceUrl, options);
    setListProvince(result.data.data);
    setShowLoading(false);
  };

  useEffect(() => {
    fetchListProvince();
  }, []);

  const save = (data) => {
    setShowLoading(true);
    const payload = {province_id: data.province_id, name: data.name };
    axios.post(regencyUrl, payload, options)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/regency', {successMessage: true})
      }).catch((error) => setShowLoading(false));
  };

  const schema = yup.object({
    province_id: yup.string().required(),
    name: yup.string().required()
  });

  const content = () => (
    <div>
      <Row>
        <Col><h5>Regency Add</h5></Col>
      </Row>
      <Formik
        validationSchema={schema}
        onSubmit={save}
        initialValues={{
          province_id: '',
          name: '',
        }}
      >
        {({
            handleSubmit,
            handleChange,
            values,
            touched,
            isValid,
            errors,
          }) => {
          const disabled = !isValid || values.province_id === '' || values.name === '';
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group as={Row}>
                <Form.Label column sm={3} className="text-right">
                  Province
                </Form.Label>
                <Col sm={4}>
                  <Form.Control as="select" size="sm" name="province_id" value={values.province_id} onChange={handleChange} isValid={touched.province_id && !errors.province_id} isInvalid={!!errors.province_id} >
                    <option value="">Choose...</option>
                    {
                      listProvince.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                      ))
                    }
                  </Form.Control>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.province_id}
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
                  <Button size="sm" type="button" variant="success" href="/regency">Back</Button>
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

export default withRouter(RegencyAdd);
