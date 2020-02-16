import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import Config from "../../Util/Config";
import {setUrl, options} from "../../Util/Api";

function CountryEdit(props) {
  console.log('edit props', props);
  const [data, setData] = useState({ id: '', name: '' });
  const [showLoading, setShowLoading] = useState(true);

  const { api: { country: { get, put }} } = Config;
  const getUrl = setUrl(`${get}/${props.match.params.id}`);
  const putUrl = setUrl(`${put}/${props.match.params.id}`);

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(getUrl, options);
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
    axios.put(putUrl, payload, options)
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
      <Jumbotron>
        <Form onSubmit={update}>
          <Form.Group>
            <Form.Label>Country Name</Form.Label>
            <Form.Control type="text" name="name" id="name" placeholder="Enter country name" value={data.name} onChange={onChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CountryEdit);
