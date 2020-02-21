import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { options, url } from "../../Util/Api";

function ProvinceAdd(props) {
  const [listCountry, setListCountry] = useState([]);
  const [data, setData] = useState({ country_id: '', name: '' });
  const [showLoading, setShowLoading] = useState(false);

  const countryUrl = `${url.country}?size=9999`;
  const provinceUrl = url.province;

  const fetchCountryData = async () => {
    const result = await axios(countryUrl, options);
    setListCountry(result.data.data);
    setShowLoading(false);
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  const save = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const payload = {country_id: data.country_id, name: data.name };
    axios.post(provinceUrl, payload, options)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/province')
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setData({...data, [e.target.name]: e.target.value});
  };

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
        <Form onSubmit={save}>
          <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
            <Form.Label column sm={3} className="text-right">
              Country
            </Form.Label>
            <Col sm={4}>
              <Form.Control as="select" size="sm" name="country_id" value={data.country_id} onChange={onChange} >
                <option>Choose...</option>
                {
                  listCountry.map((item, index) => (
                    <option key={index} value={item.id}>{item.name}</option>
                  ))
                }
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalName">
            <Form.Label column sm={3} className="text-right">
              Name
            </Form.Label>
            <Col sm={4}>
              <Form.Control size="sm" type="text" name="name" id="name" placeholder="Name" value={data.name} onChange={onChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ offset: 3 }}>
              <Button size="sm" type="submit">Submit</Button> &nbsp;
              <Button size="sm" type="button" variant="success" href="/province">Back</Button>
            </Col>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
}

export default withRouter(ProvinceAdd);
