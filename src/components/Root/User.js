import gql from "graphql-tag";
import React, { Component, useState, useEffect } from "react";

import { Form, Input, Button, Select, message, Layout, Tabs } from 'antd';
// import { Layout } from 'antd';

const { TabPane } = Tabs;
const { Header, Footer, Sider, Content } = Layout;

// import Layout from '../Shared/Layout'


import {formatError} from '#root/api/formatError'

const { Option } = Select;

import config from '../../config'

const { graphql } = require("@octokit/graphql");

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `bearer ${config.github_token}`,
  },
});

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 8 },
};


const User = (props) => {
  console.log(props.match.params.id)
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const onSearch = async (e) => {
    let query = e.target.value;
    setSearchText(query)
    if (query.length >= 2){
      const {search} = await graphqlWithAuth(queryUser(query));
      setData(search.nodes)
    } else {
      setData([])
    }
    console.log(data)
  };

  useEffect(() => {
    (async () => {
      const {user} = await graphqlWithAuth(queryUser(props.match.params.id));
      console.log(user)
    })()
  }, [])

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

const PopularRepositories = ({repositories}) => {

  return (
    <></>
  )
}

const queryUser = username => `
{
  user(login: "${username}") {
    avatarUrl
    bio
    company
    email
    name
    login
    location
    topRepositories(orderBy: {field: CREATED_AT, direction: ASC}, first: 10) {
      nodes {
        pullRequests(first: 10) {
          totalCount
        }
        issues(first: 10) {
          totalCount
        }
        url
        watchers(first: 10) {
          totalCount
        }
        stargazers(first: 10) {
          totalCount
        }
      }
    }
  }
}
`