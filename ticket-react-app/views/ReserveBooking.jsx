import { Layout, Menu, theme, Image, Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm.jsx";

const { Header, Content, Footer, Sider } = Layout;

function ReserveBooking() {
    const navigate = useNavigate();
    const { colorBgContainer, borderRadiusLG } = theme.useToken();

    const items = [
        {
            key: "1",
            icon: <HomeOutlined />,
            label: "Home",
            onClick: () => navigate("/"),
        },
        {
            key: "2",
            icon: <UserOutlined />,
            label: "Admin",
            onClick: () => navigate("/admin/login"),
        },
        { key: "3", icon: <UploadOutlined />, label: "Appointment" },
    ];

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{ height: "95vh" }}
            >
                <Image
                    width={180}
                    src="../src/assets/logo.svg"
                    style={{
                        paddingRight: 40,
                        cursor: "pointer",
                        paddingLeft: 30,
                        paddingTop: 20,
                        paddingBottom: 30,
                    }}
                    preview={false}
                />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["3"]}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        height: 25,
                    }}
                />
                <Content
                    style={{
                        margin: "10px 16px 10px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Breadcrumb style={{ marginTop: "10px" }}>
                        <Breadcrumb.Item>Your Booking</Breadcrumb.Item>
                        <Breadcrumb.Item>Event</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            marginTop: 10,
                            padding: 15,
                            minHeight: 400,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            width: "100%",
                            maxWidth: "900px",
                        }}
                    >
                        <BookingForm />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Joel Obowu ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
}

export default ReserveBooking;
