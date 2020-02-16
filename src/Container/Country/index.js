import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Table, Button, Pagination, Card, Row, Col, Form, InputGroup, FormControl} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Config from "../../Util/Config";
import {setUrl, options} from "../../Util/Api";

function Country(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { api: { country: { get }} } = Config;
  const apiUrl = setUrl(get);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl, options);
      setData(result.data.data);
      setLastPage(result.data.last_page);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showListByPage = async (page) => {
    options.params = {'page': page};
    const result = await axios(apiUrl, options);
    setData(result.data.data);
    setShowLoading(false);
    setCurrentPage(page)
  };

  const showDetail = (id) => {
    props.history.push({
      pathname: '/country/detail/' + id
    });
  };

  const edit = (id) => {
    props.history.push({
      pathname: '/country/edit/' + id
    });
  };


  let paginationItem = [];
  for (let number = 1; number <= lastPage; number++) {
    paginationItem.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => {showListByPage((number))}}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }
      <Card body>
        <Row>
          <Col xs={12} sm={4} md={8}><h5>Country</h5></Col>
          <Col>
            <Row>
              <Col xs={2} sm={2}>
                <h5><Button size="sm" variant="success" href="/country/add">Add</Button></h5>
              </Col>
              <Col><h5><Form.Control size="sm" type="text" placeholder="Search"/></h5></Col>
            </Row>
          </Col>
        </Row>
        <Table striped bordered hover size="sm"  className="text-center">
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <Button size="sm" onClick={() => {showDetail(item.id)}}>Detail</Button> {' '}
                    <Button size="sm" variant="warning" onClick={() => { edit(item.id) }}>Edit</Button> {' '}
                    <Button size="sm" variant="danger">Delete</Button>
                  </td>
                </tr>
              )
            )
          }
          </tbody>
        </Table>
        <div className="d-flex flex-row-reverse">
          <Pagination size="sm">{paginationItem}</Pagination>
        </div>
      </Card>
    </div>
  );
}

export default withRouter(Country);
