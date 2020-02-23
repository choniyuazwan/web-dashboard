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

function RegencyEdit(props) {
  const [data, setData] = useState({});
  const [listProvince, setListProvince] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const provinceUrl = `${url.province}?size=9999`;
  const regencyUrl = `${url.regency}/${props.match.params.id}`;

  const fetchData = async () => {
    const result = await axios(regencyUrl, options);
    setData(result.data.data);
    setShowLoading(false);
  };

  const fetchListProvince = async () => {
    const result = await axios(provinceUrl, options);
    setListProvince(result.data.data);
  };

  useEffect(() => {
    fetchData();
    fetchListProvince();
  }, []);

  const update = (data) => {
    setShowLoading(true);
    const payload = {province_id: data.province_id, name: data.name };
    axios.put(regencyUrl, payload, options)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/regency', {successMessage: true});
      }).catch((error) => setShowLoading(false));
  };

  const schema = yup.object({
    province_id: yup.string().required(),
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
          province_id: data.province_id,
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
                        <option selected={item.id===data.province_id} key={index} value={item.id}>{item.name}</option>
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

export default withRouter(RegencyEdit);
