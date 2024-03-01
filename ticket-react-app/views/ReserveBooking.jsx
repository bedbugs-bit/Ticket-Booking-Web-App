import { Layout, Menu, theme, Image, Breadcrumb } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
// import BookingForm from "../components/BookingForm";
import React from "react";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const items = [
    {
        key: "1",
        label: "Home",
        icon: React.createElement(UserOutlined),
    },
    {
        key: "2",
        label: "Appointment",
        icon: React.createElement(UploadOutlined),
    },
];

function ReserveBooking() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => console.log(broken)}
                onCollapse={(collapsed, type) => console.log(collapsed, type)}
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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
                    {items.map((item) => (
                        <Menu.Item
                            key={item.key}
                            icon={item.icon}
                            onClick={() => {
                                if (item.key === "1") {
                                    navigate("/");
                                }
                            }}
                        >
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
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
                        // justifyContent: "center",
                    }}
                >
                    <Breadcrumb
                        style={{
                            marginTop: "10",
                        }}
                    >
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
                        {/* <BookingForm /> */}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    Joel Obowu ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
}

export default ReserveBooking;
