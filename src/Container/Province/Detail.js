import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { options, url } from "../../Util/Api";
import { Card, Col, Row } from "react-bootstrap";

function CountryDetail(props) {
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

  const edit = (id) => {
    props.history.push({
      pathname: '/country/edit/' + id
    });
  };

  const content = () => (
    <div>
      <Row>
        <Col><h5>Country Detail</h5></Col>
      </Row>
      <br/>
      <Row>
        <Col xs={3} className="text-right">Id</Col>
        <Col xs={9}>{data.id}</Col>
      </Row>
      <Row>
        <Col xs={3} className="text-right">Name</Col>
        <Col xs={9}>{data.name}</Col>
      </Row>
      <br/>
      <Row>
        <Col sm={9} xs={{offset: 3}}>
          <Button size="sm" type="button" variant="warning" onClick={() => { edit(data.id) }}>Edit</Button> &nbsp;
          <Button size="sm" type="button" variant="danger">Delete</Button> &nbsp;
          <Button size="sm" type="button" variant="success" href="/country">Back</Button>
        </Col>
      </Row>
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

export default withRouter(CountryDetail);
