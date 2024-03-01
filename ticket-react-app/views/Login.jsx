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
    message,
} from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axios-client";

const { Footer } = Layout;
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

function Login() {
    const { token } = useToken();
    const screens = useBreakpoint();

    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axiosClient.post("/login", {
                email: values.email,
                password: values.password,
            });
            // store the token in local storage
            localStorage.setItem("ACCESS_TOKEN", response.data.token);
            message.success("Login successful");
            setLoading(false);
            // navigate("/admin/dashboard"); // Redirect to the admin dashboard page
        } catch (error) {
            // Error handling
            if (error.response && error.response.status === 401) {
                // Specific message for unauthorized
                message.error(
                    "Login failed: Unauthorized. Please check your credentials."
                );
            } else if (error.response && error.response.status === 404) {
                // Handle not found errors
                message.error("Login failed: Service not found.");
            } else {
                // General error message for other HTTP status codes or network errors
                message.error("Login failed. Please try again.");
            }
            setLoading(false);
        }
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
                        <Button
                            block="true"
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
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

            <div style={{ justify: "space-between" }}></div>
        </section>
    );
}

export default Login;
