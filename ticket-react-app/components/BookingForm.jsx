import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input, Select, DatePicker, notification } from "antd";
import axios from "axios";

const { Option } = Select;

function BookingForm() {
    const [events, setEvents] = useState([]);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            event: "",
            email: "",
            date: null,
            tickets: 1,
        },
    });


    // Fetch events and their types from the backend APIs

    useEffect(() => {
        const fetchEvents = async () => {
          try {
            // Laravel API end point for fetching events 
            const response = await axios.get('/api/events');
            setEvents(response.data);
          } catch (error) {
            console.error('Failed to fetch events:', error);
            notification.error({
              message: 'Error',
              description: 'Failed to fetch events.',
            });
          }
        };
    
        fetchEvents();
      }, []);


      const onSubmit = async (data) => {
        try {
          // laravel endpoints for submitting data to the backend
          await axios.post('/api/bookings', data);
          notification.success({
            message: 'Success',
            description: 'Booking successful!',
          });
          reset();
        } catch (error) {
          console.error('Booking failed:', error);
          notification.error({
            message: 'Booking Error',
            description: 'Booking failed. Please try again.',
          });
        }
      };



    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Event" required>
          <Controller
            name="event"
            control={control}
            rules={{ required: 'Event is required' }}
            render={({ field }) => (
              <Select {...field} placeholder="Select an event">
                {events.map((event) => (
                  <Option key={event.id} value={event.id}>{event.name}</Option>
                ))}
              </Select>
            )}
          />
          {errors.event && <p style={{ color: 'red' }}>{errors.event.message}</p>}
        </Form.Item>
  
        <Form.Item label="Email" required>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            }}
            render={({ field }) => <Input {...field} type="email" placeholder="Email" />}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </Form.Item>
  
        <Form.Item label="Date of Booking" required>
          <Controller
            name="date"
            control={control}
            rules={{ required: 'Booking date is required' }}
            render={({ field }) => <DatePicker {...field} onChange={(date) => field.onChange(date)} />}
          />
          {errors.date && <p style={{ color: 'red' }}>{errors.date.message}</p>}
        </Form.Item>
  
        <Form.Item label="Number of Tickets" required>
          <Controller
            name="tickets"
            control={control}
            rules={{
              required: 'Number of tickets is required',
              min: {
                value: 1,
                message: 'At least 1 ticket is required'
              },
              max: {
                value: 5,
                message: 'You can book up to 5 tickets'
              }
            }}
            render={({ field }) => <Input {...field} type="number" placeholder="Number of Tickets" />}
          />
          {errors.tickets && <p style={{ color: 'red' }}>{errors.tickets.message}</p>}
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Reserve Tickets
          </Button>
        </Form.Item>
      </Form>
    );
}

export default BookingForm;
