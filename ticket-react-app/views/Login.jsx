// import React from 'react'

import {
    Button,
    Checkbox,
    Form,
    Grid,
    Input,
    theme,
    Typography,
    Image,
    Layout,
} from "antd";

import { LockOutlined, MailOutlined } from "@ant-design/icons";
const { Footer } = Layout;

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

function Login() {
    const { token } = useToken();
    const screens = useBreakpoint();

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    const styles = {
        container: {
            margin: "0 auto",
            padding: screens.md
                ? `${token.paddingXL}px`
                : `${token.sizeXXL}px ${token.padding}px`,
            width: "380px",
        },
        footer: {
            marginTop: token.marginLG,
            textAlign: "center",
            width: "100%",
        },
        forgotPassword: {
            float: "right",
        },
        header: {
            marginBottom: token.marginXL,
        },
        section: {
            alignItems: "center",
            backgroundColor: token.colorBgContainer,
            display: "flex",
            height: "100vh",
            padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
        },
        text: {
            color: token.colorTextSecondary,
        },
        title: {
            fontSize: screens.md
                ? token.fontSizeHeading2
                : token.fontSizeHeading3,
        },
    };

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <Image
                        width={180}
                        src="../src/assets/logo.svg"
                        style={{ paddingRight: 40, cursor: "pointer" }}
                        preview={false}
                    />

                    <Title style={styles.title}>Sign in</Title>
                    <Text style={styles.text}>
                        Welcome back Admin, <br />
                        Please enter your details to sign in.
                    </Text>
                </div>
                <Form
                    name="normal_login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a style={styles.forgotPassword} href="">
                            Forgot password?
                        </a>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "0px" }}>
                        <Button block="true" type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
                <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    Joel Obowu ©{new Date().getFullYear()}
                </Footer>
            </div>

            <div style={{ justify: "space-between" }}>
                
            </div>
        </section>
    );
}

export default Login;
