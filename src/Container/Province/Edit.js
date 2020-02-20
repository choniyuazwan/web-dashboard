import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { options, url} from "../../Util/Api";
import {Card, Col, Row} from "react-bootstrap";

function CountryEdit(props) {
  const [data, setData] = useState({ id: '', name: '' });
  const [showLoading, setShowLoading] = useState(true);

  const apiUrl = `${url.country}/${props.match.params.id}`;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl, options);
      setData(result.data.data);
      console.log(result.data.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const update = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const payload = { name: data.name };
    axios.put(apiUrl, payload, options)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/country');
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
          <Col><h5>Country Edit</h5></Col>
        </Row>
        <Form onSubmit={update}>
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

export default withRouter(CountryEdit);
