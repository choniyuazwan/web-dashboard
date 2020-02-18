import React, {useState} from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import fakeAuth from "../../Util/Auth";
import { options, url } from "../../Util/Api";

function Login(props) {
  const [data, setData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/login" } };

  const apiUrl = url.login;

  const login = (e) => {
    setIsLoading(true);
    e.preventDefault();
    axios.post(apiUrl, data, options)
      .then((result) => {
        localStorage.setItem('token', result.data.accessToken);
        setIsLoading(false);
        props.history.push('/country')
      }).catch((error) => console.log(error));

    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  const onChange = (e) => {
    e.persist();
    setData({...data, [e.target.name]: e.target.value});
  };

  return (
    <div>
      {isLoading &&
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      }
      <Row>
        <Col sm={{ span: 10, offset: 1 }}  md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card body className="text-center">
            <Card.Title>Login</Card.Title>
            <Form onSubmit={login}>
              <Form.Group as={Row} controlId="formHorizontalName">
                <Form.Label column xs={3} className="text-right">
                  Email
                </Form.Label>
                <Col xs={8}>
                  <Form.Control size="sm" type="text" name="email" id="email" placeholder="email" value={data.email} onChange={onChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalName">
                <Form.Label column xs={3} className="text-right">
                  Password
                </Form.Label>
                <Col xs={8}>
                  <Form.Control size="sm" type="password" name="password" id="password" placeholder="password" value={data.password} onChange={onChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="text-left">
                <Col xs={{ offset: 3 }}>
                  <Button size="sm" type="submit">Signin</Button>
                </Col>
              </Form.Group>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Login);
