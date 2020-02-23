import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Spinner,
  Table,
  Button,
  Pagination,
  Card,
  Row,
  Col,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { url, options } from "../../Util/Api";
import AlertMessage from "../../Component/AlertMessage";

function Regency(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [totalData, setTotalData] = useState(0);
  const [successMessage, setSuccessMessage] = useState(props.location.state);

  const apiUrl = url.regency;

  const fetchData = async () => {
    options.params = {
      'page': '',
      'keyword': ''
    };
    const result = await axios(apiUrl, options);
    setData(result.data.data);
    setCurrentPage(1);
    setLastPage(result.data.last_page);
    setTotalData(result.data.total);
    setShowLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showListByPage = async (page) => {
    options.params = {
      'page': page,
      'keyword': keyword
    };
    const result = await axios(apiUrl, options);
    setData(result.data.data);
    setCurrentPage(page);
    setLastPage(result.data.last_page);
    setTotalData(result.data.total);
  };

  const showDetail = (id) => {
    props.history.push({
      pathname: '/regency/detail/' + id
    });
  };

  const edit = (id) => {
    props.history.push({
      pathname: '/regency/edit/' + id
    });
  };

  const showListBySearch = async (keyword) => {
    options.params = {'keyword': keyword};
    const result = await axios(apiUrl, options);
    setData(result.data.data);
    setLastPage(result.data.last_page);
    setTotalData(result.data.total);
    setCurrentPage(1);
  };

  const onChange = (e) => {
    e.persist();
    setKeyword(e.target.value);
    showListBySearch(e.target.value);
  };

  const resetKeyword = () => {
    setKeyword('');
    fetchData();
  };

  let paginationItem = [];
  for (let number = 1; number <= lastPage; number++) {
    paginationItem.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => {showListByPage((number))}}>
        {number}
      </Pagination.Item>,
    );
  }

  const content = () => (
    <div>
      <Row>
        <Col xs={12} sm={4} md={8}><h5>Regency</h5></Col>
        <Col>
          <Row>
            <Col xs={2} sm={2}>
              <h5><Button size="sm" variant="success" href="/regency/add">Add</Button></h5>
            </Col>
            <Col>
              <h5>
                <InputGroup>
                  <FormControl size="sm" placeholder="Search" type="text" name="keyword" id="keyword" value={keyword} onChange={onChange} />
                  <InputGroup.Append><Button size="sm" variant="outline-danger" onClick={resetKeyword}>X</Button></InputGroup.Append>
                </InputGroup>
              </h5>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table striped bordered hover size="sm"  className="text-center">
        <thead>
        <tr>
          <th>Id</th>
          <th>Country</th>
          <th>Province</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {
          data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.id}</td>
                <td>{item.province.country.name}</td>
                <td>{item.province.name}</td>
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
      <Row>
        <Col><p>Total data: {totalData}</p></Col>
        <Col className="d-flex flex-row-reverse">
          <Pagination size="sm">
            {paginationItem}
          </Pagination>
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
        <AlertMessage show={successMessage} />
        { showLoading ? loading() : content() }
      </Card>
    </div>
  );
}

export default withRouter(Regency);
