import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input, Select, DatePicker, notification } from "antd";
import axios from "axios";

const { Option } = Select;
const generateBookingReference = () => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 8;
    let bookingReference = "";
    for (let i = 0; i < length; i++) {
        bookingReference += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return bookingReference;
};

function BookingForm() {
    const [events, setEvents] = useState([]);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            eventTypeId: "",
            userEmail: "",
            bookingDate: null,
            numberOfTickets: 1,
        },
    });

    useEffect(() => {
        // Fetch events to populate the event selection dropdown
        const fetchEvents = async () => {
            try {
                const { data: eventsData } = await axios.get(
                    "http://localhost:8000/api/events"
                );
                setEvents(eventsData);
            } catch (error) {
                notification.error({
                    message: "Error",
                    description: "Failed to fetch events.",
                });
            }
        };
        fetchEvents();
    }, []);

    const onSubmit = async (data) => {
        // Prepare the booking data
        const bookingData = {
            event_id: data.eventTypeId,
            user_email: data.userEmail,
            booking_reference: generateBookingReference(),
            number_of_tickets: data.numberOfTickets,
            date: data.bookingDate
                ? data.bookingDate.format("YYYY-MM-DD")
                : null, // Format date
        };

        console.log(bookingData);

        try {
            // Submit booking data to the backend
            await axios.post("http://localhost:8000/api/bookings", bookingData);
            notification.success({
                message: "Booking Successful",
                description: "Your booking has been successfully recorded.",
            });
            reset(); // Reset form fields after successful booking
        } catch (error) {
            notification.error({
                message: "Booking Error",
                description:
                    "There was a problem with your booking. Please try again.",
            });
        }
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item label="Event">
                <Controller
                    name="eventTypeId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select {...field} placeholder="Select an event">
                            {events.map((event) => (
                                <Option key={event.id} value={event.id}>
                                    {event.name}
                                </Option>
                            ))}
                        </Select>
                    )}
                />
            </Form.Item>

            <Form.Item label="Email">
                <Controller
                    name="userEmail"
                    control={control}
                    rules={{ required: true, pattern: /^\S+@\S+\.\S+$/ }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                        />
                    )}
                />
            </Form.Item>

            <Form.Item label="Booking Date">
                <Controller
                    name="bookingDate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            onChange={(date) => field.onChange(date)}
                            format="YYYY-MM-DD"
                        />
                    )}
                />
            </Form.Item>

            <Form.Item label="Number of Tickets">
                <Controller
                    name="numberOfTickets"
                    control={control}
                    rules={{ required: true, min: 1, max: 5 }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="number"
                            placeholder="Number of tickets"
                        />
                    )}
                />
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
