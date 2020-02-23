import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { options, url } from "../../Util/Api";
import { Card, Col, Row } from "react-bootstrap";

function RegencyDetail(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);

  const apiUrl = `${url.regency}/${props.match.params.id}`;

  useEffect(() => {
    setShowLoading(true);
    const fetchData = async () => {
      const result = await axios(apiUrl, options);
      setData(result.data.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const edit = (id) => {
    props.history.push({
      pathname: '/regency/edit/' + id
    });
  };

  const content = () => (
    <div>
      <Row>
        <Col><h5>Regency Detail</h5></Col>
      </Row>
      <br/>
      <Row>
        <Col xs={3} className="text-right">Id</Col>
        <Col xs={9}>{data.id}</Col>
      </Row>
      <Row>
        <Col xs={3} className="text-right">Country</Col>
        <Col xs={9}>{data.province.country.name}</Col>
      </Row>
      <Row>
        <Col xs={3} className="text-right">Province</Col>
        <Col xs={9}>{data.province.name}</Col>
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
          <Button size="sm" type="button" variant="success" href="/regency">Back</Button>
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

export default withRouter(RegencyDetail);
