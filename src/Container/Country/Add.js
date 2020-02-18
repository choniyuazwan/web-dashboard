import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { options, url } from "../../Util/Api";

function CountryAdd(props) {
  const [data, setData] = useState({ id: '', name: '' });
  const [showLoading, setShowLoading] = useState(false);

  const apiUrl = url.country;

  const save = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const payload = { name: data.name };
    axios.post(apiUrl, payload, options)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/country')
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
          <Col><h5>Country Add</h5></Col>
        </Row>
        <Form onSubmit={save}>
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
              <Button size="sm" type="button" variant="success" href="/country">Back</Button>
            </Col>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
}

export default withRouter(CountryAdd);
