import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowCountry(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = 'http://api-alpha.law-go.co.id/api/administrative/country/' + props.match.params.id;
  const options = {
    headers: {'api-client-access-token': 'lawgoindonesia'}
  };

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl, options);
      setData(result.data.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editProduct = (id) => {
    props.history.push({
      pathname: '/editcountry/' + id
    });
  };

  const deleteProduct = (id) => {
    setShowLoading(true);
    const product = { prod_name: data.prod_name, prod_desc: data.prod_desc, prod_price: parseInt(data.prod_price) };
    axios.delete(apiUrl, product)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/listcountry')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }
      <Jumbotron>
        <h1>{data.name}</h1>
        <p>{data.prod_desc}</p>
        <h2>Price: ${data.prod_price}</h2>
        <p>
          <Button type="button" variant="primary" onClick={() => { editProduct(data.id) }}>Edit</Button>&nbsp;
          {/*<Button type="button" variant="danger" onClick={() => { deleteProduct(data.id) }}>Delete</Button>*/}
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowCountry);
