import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import '../css/form.css'; // Import your custom CSS file

type FormValues = {
  fullName: string;
  messageContent: string;
  email: string;
  telephone?: string;
};

const ContactForm = () => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    alert('Form submitted successfully');
    console.log(data);
    // Handle the form submission logic here

    // Reset the form values
    reset({
      fullName: '',
      messageContent: '',
      email: '',
      telephone: ''
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <Form.Group controlId="formFullName">
        <Form.Label>Full Name</Form.Label>
        <Controller
          name="fullName"
          control={control}
          defaultValue=""
          rules={{ required: 'Full name is required' }}
          render={({ field }) => <Form.Control type="text" placeholder="Enter your full name" {...field} />}
        />
        {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
      </Form.Group>
      <br />
      <Form.Group controlId="formMessageContent">
        <Form.Label>Message Content</Form.Label>
        <Controller
          name="messageContent"
          control={control}
          defaultValue=""
          rules={{ required: 'Message content is required' }}
          render={({ field }) => <Form.Control as="textarea" rows={3} placeholder="Enter your message" {...field} />}
        />
        {errors.messageContent && <p className="error-message">{errors.messageContent.message}</p>}
      </Form.Group>
      <br />
      <Form.Group controlId="formEmail">
        <Form.Label>Email Address</Form.Label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Invalid email address'
            }
          }}
          render={({ field }) => <Form.Control type="email" placeholder="Enter your email" {...field} />}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </Form.Group>
      <br />
      <Form.Group controlId="formTelephone">
        <Form.Label>Telephone (optional)</Form.Label>
        <Controller
          name="telephone"
          control={control}
          defaultValue=""
          render={({ field }) => <Form.Control type="text" placeholder="Enter your telephone number (optional)" {...field} />}
        />
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">Send</Button>
    </Form>
  );
};

export default ContactForm;
