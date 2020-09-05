
import { Layout } from 'antd';
const { Content } = Layout

import React from "react";

const Container = (props) => {
  return (
    <Layout style={{minHeight: '100vh', padding: "20px 15%"}}>
        <Content>
            {props.children}
        </Content>
    </Layout>
  )
};

export default Container;