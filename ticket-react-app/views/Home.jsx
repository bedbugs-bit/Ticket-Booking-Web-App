// import React from "react";
import {
    Breadcrumb,
    Layout,
    Menu,
    theme,
    Image,
    Card,
    // Flex,
    Typography,
    Button,
    Row,
    Col,
} from "antd";
const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

// const items = [
//     { key: "1", label: "Home" },
//     { key: "2", label: "Book Appointment" },
// ];

function Home() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 60,
                    paddingRight: 150,
                }}
            >
                <Image
                    width={180}
                    src="../src/assets/logo.svg"
                    style={{ paddingRight: 40, cursor: "pointer" }}
                    preview={false}
                />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    // items={items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />
            </Header>
            <Content
                style={{
                    padding: "0 48px",
                }}
            >
                <Breadcrumb
                    style={{
                        margin: "16px 0",
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Welcome</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        // minHeight: 400,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {/* <Card
                        style={{ padding: 10, overflow: "hidden", height: 400 }}
                    >
                        <Flex justify="space-between">
                            <Image
                                src="../src/assets/coupons-image.jpg"
                                preview={false}
                                style={{
                                    height: 600,
                                    borderRadius: 10,
                                }}
                            ></Image>

                            <Flex
                                vertical
                                align="flex-end"
                                style={{
                                    padding: 32,
                                    width: "35%",
                                }}
                            >
                                <Title
                                    style={{
                                        fontSize: 30,
                                        alignItems: "right",
                                    }}
                                    align="center"
                                >
                                    Find and Book Tickets for your Fav Events
                                </Title>
                                <Text italic align="center">
                                    Say hello to quick, easy, and convenient
                                    booking, where you can effortlessly reserve
                                    your spot in just a few clicks.
                                </Text>
                                <Button
                                    className="animated-button"
                                    type="primary"
                                    href="https://ant.design"
                                    target="_blank"
                                    style={{ marginTop: 20 }}
                                >
                                    Explore Now
                                </Button>
                            </Flex>
                        </Flex>
                    </Card> */}

                    <Card
                        style={{
                            padding: 10,
                            overflow: "hidden",
                            minHeight: 380,
                        }}
                    >
                        <Row justify="space-between">
                            <Col xs={24} md={15}>
                                <Image
                                    src="../src/assets/coupons-image.jpg"
                                    preview={false}
                                    style={{
                                        height: "100%",
                                        borderRadius: 10,
                                        objectFit: "cover",
                                    }}
                                />
                            </Col>

                            <Col xs={24} md={8}>
                                <div style={{ padding: 32 }}>
                                    <Title
                                        style={{
                                            fontSize: 30,
                                            alignItems: "right",
                                        }}
                                        align="center"
                                    >
                                        Find and Book Tickets for your Fav
                                        Events
                                    </Title>
                                    <Text italic align="center" block>
                                        Say hello to quick, easy, and convenient
                                        booking, where you can effortlessly
                                        reserve your spot in just a few clicks.
                                    </Text>
                                    <Button
                                        className="animated-button"
                                        type="primary"
                                        href="/book-appointment"
                                        target="_blank"
                                        style={{ marginTop: 20 }}
                                        block
                                    >
                                        Explore Now
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card>
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
    );
}

export default Home;
