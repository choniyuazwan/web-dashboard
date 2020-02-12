import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Spinner, Jumbotron, Form, Button, Row, Col, Card} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

function CountryAdd(props) {
  console.log('create props', props);
  const [product, setProduct] = useState({ id: '', name: '' });
  const [showLoading, setShowLoading] = useState(false);

  const apiUrl = 'http://api-alpha.law-go.co.id/api/administrative/country';
  const options = {
    headers: {
      'api-client-access-token': 'lawgoindonesia'
    }
  };

  useEffect(() => {
    const getToken = () => {
      const apiUrl = 'http://api-alpha.law-go.co.id/api/authentication/login';
      const data = { email: 'admin@mail.com', password: 'admin' };
      axios.post(apiUrl, data, options)
        .then((result) => {
          localStorage.setItem('token', result.data.accessToken);
          options.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }).catch((error) => console.log(error));
    };

    getToken();
  });

  const saveProduct = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { name: product.name };
    axios.post(apiUrl, data, options)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/country')
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setProduct({...product, [e.target.name]: e.target.value});
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
        <Form onSubmit={saveProduct}>
          <Form.Group as={Row} controlId="formHorizontalName">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control size="sm" type="text" name="name" id="name" placeholder="Name" value={product.name} onChange={onChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ offset: 2 }}>
              <Button size="sm" type="submit">Submit</Button>
            </Col>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
}

export default withRouter(CountryAdd);
