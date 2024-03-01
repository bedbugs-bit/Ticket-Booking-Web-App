import { useState, useEffect } from "react";
import {
    Layout,
    Button,
    Table,
    message,
    Modal,
    Form,
    Input,
    Image,
} from "antd";
import {
    LogoutOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axios-client";

const { Header, Content, Footer } = Layout;

function AdminDashboard() {
    const [events, setEvents] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        fetchEventsAndTypes();
    }, []);

    const fetchEventsAndTypes = async () => {
        try {
            const { data: eventsData } = await axiosClient.get("/events");
            const { data: eventTypesData } = await axiosClient.get(
                "/event-types"
            );
            const combinedData = eventsData.map((event) => ({
                ...event,
                types: eventTypesData
                    .filter((type) => type.event_id === event.id)
                    .map(
                        (type) =>
                            `${type.type} - $${type.price}, Max attendees: ${type.max_attendees}`
                    )
                    .join("; "),
            }));
            setEvents(combinedData);
        } catch (error) {
            message.error("Failed to fetch events and types.");
        }
    };

    const showModal = (event = null) => {
        setCurrentEvent(event);
        setIsModalVisible(true);
        form.setFieldsValue({
            name: event?.name || "",
            description: event?.description || "",
        });
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentEvent(null);
    };

    const onFormSubmit = async (values) => {
        const { name, description } = values;
        if (currentEvent) {
            // Update logic here
        } else {
            try {
                await axiosClient.post("/events", { name, description });
                message.success("Event added successfully.");
                fetchEventsAndTypes();
            } catch (error) {
                message.error("Failed to add event.");
            }
        }
        setIsModalVisible(false);
        form.resetFields();
    };

    const deleteEvent = async (id) => {
        try {
            await axiosClient.delete(`/events/${id}`);
            message.success("Event deleted successfully.");
            fetchEventsAndTypes();
        } catch (error) {
            message.error("Failed to delete event.");
        }
    };

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Description", dataIndex: "description", key: "description" },
        // { title: "Types", dataIndex: "types", key: "types" },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => showModal(record)}
                        style={{ marginRight: 20 }}
                    >
                        Edit
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => deleteEvent(record.id)}
                        danger
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const logout = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        navigate("/");
    };

    return (
        <Layout>
            <Header>
                <Image
                    width={180}
                    src="../src/assets/logo.svg"
                    style={{ paddingRight: 40, cursor: "pointer" }}
                    preview={false}
                />
                <Button
                    icon={<LogoutOutlined />}
                    onClick={logout}
                    style={{ float: "right", marginTop: "15px" }}
                >
                    Log Out
                </Button>
            </Header>
            <Content style={{ padding: "20px" }}>
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => showModal()}
                    style={{ marginBottom: 16 }}
                >
                    Add Event
                </Button>
                <Table dataSource={events} columns={columns} rowKey="id" />
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Joel Obowu ©{new Date().getFullYear()}
            </Footer>
            <Modal
                title={currentEvent ? "Edit Event" : "Add Event"}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" onFinish={onFormSubmit}>
                    <Form.Item
                        name="name"
                        label="Event Name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
}

export default AdminDashboard;
