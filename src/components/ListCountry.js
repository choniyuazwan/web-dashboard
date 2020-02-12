import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Table, Button, Pagination, Card, Row, Col, Form, InputGroup, FormControl} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

function ListCountry(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const apiUrl = 'http://api-alpha.law-go.co.id/api/administrative/country';
  const options = {
    headers: {'api-client-access-token': 'lawgoindonesia'}
  };

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
      pathname: '/showcountry/' + id
    });
  }

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
          <Col><h5>Country</h5></Col>
          <Col>
            <Row>
              <Col className="d-flex flex-row-reverse">
                <h5><Button size="sm" variant="success" onClick={() => {}}>Add</Button></h5>
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
                    <Button size="sm" onClick={() => {showDetail(item.id)}}>Edit</Button> {' '}
                    <Button size="sm" variant="danger">Delete</Button>
                  </td>
                </tr>
              )
            )
          }
          </tbody>
        </Table>
        <div className="d-flex flex-row-reverse">
          <Pagination>{paginationItem}</Pagination>
        </div>
      </Card>
    </div>
  );
}

export default withRouter(ListCountry);
