import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CountryEdit(props) {
  console.log('edit props', props);
  const [product, setProduct] = useState({ id: '', name: '' });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = 'http://api-alpha.law-go.co.id/api/administrative/country/' + props.match.params.id;
  const options = {
    headers: {
      'api-client-access-token': 'lawgoindonesia',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTBlOTBlNWY3NzU1NGQ2Y2ZiZTljMjcxMDc5MTMyNmIxZjVkYWRhMGE3ZTFiYjBmMDA0MzFiMmY5ZjAxMzViZWQ2MGYwODdjYWJkMWNhN2IiLCJpYXQiOjE1ODEzNDUyMjksIm5iZiI6MTU4MTM0NTIyOSwiZXhwIjoxNjEyOTY3NjI4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.wXGQv8t8cxuAAXKXpKCVAUGnLRhKt_4IqWn6O0oNM7XQA415VdI1-Wn8G_83ptc6TDVwS8uAvPDX9ZOqo6fdktXGegiJ5yhVSeq0UuEFgUea48A0NZVnEk5sJo_rzj9ZJqGLOYtNnZP1y-gI8aN65GrJ6Q9UghJW6KEbrDiBCyGwhbpgMOwPmlzSyaBLdOIVXw0g0-MwLQk0yV7LBpEmeXlGOiBe0RLezjCWG_8BkHNXZbzW-rSmsOqtwjrb94-yjEFdwfe6765cobG-h-aGLFv9IpLJkbqu_zYhpQyWwKn0eTDXRjja7S6BhRbRjWIvrMdKIFy1sAburp1MnGGSKG4TeOetNkjLV213VitxM64b4cV0Kcu8WHBe2_HlK6yktqNCCgcemDlUvoAsIQbNluecUEVziRw0gJ7Ci2qKMzMBC4isEbPPyDdI6MqUDPsR4b5hg2-X6whLatkpicxy9Sfo5Qogsby50UeZS3v_hwTcwuauN4etd5jFZEbMkm7aI-sgQpfWyCvRLAIamvwjX2sm_SNT9Gtd8RHcxCR9i5y2TaehIWm_hPzz6INp-G6H5i_OxQMW6wixsEG4ZhZT3T0RwMdtMWU_PUTMjFYu_rZWRT9Jm2PLbLN9HGPPdHO6yiD6-yGXdVdiy0mQ2MT2scfHCikSFDf-wA7DRsjR430'
    }
  };

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl, options);
      setProduct(result.data.data);
      console.log(result.data.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateProduct = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { name: product.name };
    axios.put(apiUrl, data, options)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/country/show/' + result.data.data.id)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setProduct({...product, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading &&
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      <Jumbotron>
        <Form onSubmit={updateProduct}>
          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" name="name" id="name" placeholder="Enter product name" value={product.name} onChange={onChange} />
          </Form.Group>
          {/*<Form.Group>*/}
          {/*  <Form.Label>Product Description</Form.Label>*/}
          {/*  <Form.Control as="textarea" name="prod_desc" id="prod_desc" rows="3" placeholder="Enter product description" value={product.prod_desc} onChange={onChange} />*/}
          {/*</Form.Group>*/}
          {/*<Form.Group>*/}
          {/*  <Form.Label>Product Price</Form.Label>*/}
          {/*  <Form.Control type="number" name="prod_price" id="prod_price" placeholder="Enter product price" value={product.prod_price} onChange={onChange} />*/}
          {/*</Form.Group>*/}
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CountryEdit);
