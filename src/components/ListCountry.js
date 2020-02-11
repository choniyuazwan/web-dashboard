import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Table, Button, Pagination} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

function ListCountry(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [lastPage, setLastPage] = useState(0);

  const [firstPageUrl, setFirstPageUrl] = useState('');
  const [lastPageUrl, setLastPageUrl] = useState('');

  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState('');

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

  const showDetail = (id) => {
    props.history.push({
      pathname: '/showcountry/' + id
    });
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }
      <Table striped bordered hover size="sm">
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
        <tr>
          <td colSpan="3">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              {/*<Pagination.Ellipsis disabled/>*/}

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item>{14}</Pagination.Item>

              {/*<Pagination.Ellipsis disabled/>*/}
              <Pagination.Item>{lastPage}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </td>
        </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default withRouter(ListCountry);
