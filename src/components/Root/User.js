import gql from "graphql-tag";
import React, { Component, useState, useEffect } from "react";

import { Form, Input, Button, Select, message, Layout, Tabs } from 'antd';
// import { Layout } from 'antd';

const { TabPane } = Tabs;
const { Header, Footer, Sider, Content } = Layout;

// import Layout from '../Shared/Layout'


import {formatError} from '#root/api/formatError'


const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 8 },
};


const User = (props) => {
  console.log(props.match.params.id)

  return (
    <Layout style={{paddingTop: 50, background: 'white'}}>
      <Sider style={{background: 'white'}}></Sider>
      <Layout style={{background: 'white'}}>
        <Content>
          <Tabs defaultActiveKey="1" onChange={() => {}}>
            <TabPane tab="Overview" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Repositories" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Projects" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Packages" key="4">
              Content of Tab Pane 4
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  )
};

export default User;
