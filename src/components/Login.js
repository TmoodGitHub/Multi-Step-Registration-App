import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userDetails, setUserDetails] = useState('');

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(`${BASE_API_URL}/login`, data);
      Swal.fire('Sweet!', "You've successfully registered!", 'success');
      setSuccessMessage('User with provided credentials found.');
      setErrorMessage('');
      setUserDetails(response.data);
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage(error.response.data);
      Swal.fire({
        icon: 'error',
        title: 'Uh oh..',
        text: error.response.data,
      });
    }
  };

  return (
    <Form className='input-form' onSubmit={handleSubmit(onSubmit)}>
      <motion.div className='col-md-6 offset-md-3' initial={{ x: '-100vh' }} animate={{ x: 0 }}>
        <h5>Find your Login Information</h5>
        <hr />
        {errorMessage ? (
          <p className='errorMsg login-error'>{errorMessage}</p>
        ) : (
          <div>
            <p className='successMsg'>{successMessage}</p>

            {userDetails && (
              <Card style={{ width: '25rem' }}>
                <Card.Header>User Details:</Card.Header>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <strong>First Name:</strong> {userDetails.first_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Last Name:</strong> {userDetails.last_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Email:</strong> {userDetails.user_email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Country:</strong> {userDetails.country}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>State:</strong> {userDetails.state}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>City:</strong> {userDetails.city}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            )}
            <br />
          </div>
        )}

        <Form.Group controlId='user_email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='user_email'
            placeholder='Enter your email address'
            ref={register({
              required: 'Email is required.',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid.',
              },
            })}
            className={`${errors.user_email} ? 'input-error' :''`}
          />
          {errors.user_email && <p className='errorMsg'>{errors.user_email.message}</p>}
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='user_password'
            placeholder='Enter your password'
            ref={register({
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password should have at least 6 characters.',
              },
            })}
            className={`${errors.user_password ? 'input-error' : ''}`}
          />
          {errors.user_password && <p className='errorMsg'>{errors.user_password.message}</p>}
        </Form.Group>

        <Button variant='primary' type='submit'>
          Check Login
        </Button>
      </motion.div>
    </Form>
  );
};

export default Login;
