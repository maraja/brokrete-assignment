import gql from "graphql-tag";
import React, { Component, useState, useEffect } from "react";

import { Form, Input, Button, Select, message, Layout, Tabs, Row, Col, Badge, Skeleton, Tag } from 'antd';
// import { Layout } from 'antd';

const { TabPane } = Tabs;
const { Header, Footer, Sider, Content } = Layout;

import { StarOutlined, ForkOutlined } from '@ant-design/icons';

import Container from '../Shared/Container'


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
  const [data, setData] = useState(null);
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
      setData(user)
      console.log(user)
    })()
  }, [])

  return (
    <Layout style={{paddingTop: 50, background: 'white'}}>
      <Container>
      <Sider style={{background: 'white'}}></Sider>
      <Layout style={{background: 'white'}}>
        <Content>
          <Tabs defaultActiveKey="1" onChange={() => {}}>
            <TabPane tab="Overview" key="1">
              {data && <PopularRepositories repositories={data.topRepositories.nodes} />}
              {!data && <Skeleton active />}
            </TabPane>
            <TabPane tab={`Repositories ${data ? "("+data.topRepositories.totalCount+")" : ''}`} key="2">
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
      </Container>
    </Layout>
  )
};

export default User;

const PopularRepositories = ({repositories}) => {

  return (
    <div> 
      <Row gutter={[16, 16]}>
        {repositories.map(r => (
          <Col span={12}>
            <RepositoryCard repository={r} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

const RepositoryCard = ({repository}) => (
  <div style={{ border: 'solid 1px #eee', padding: '10px 20px 0px 20px', borderRadius: 5 }}>
    <h3>{repository.name}</h3>
    <p>{repository.description}</p>
    <p>
      { repository.primaryLanguage && <Badge color={repository.primaryLanguage.color} text={repository.primaryLanguage.name}/> }
      <Count text={repository.stargazers.totalCount} icon={<StarOutlined />}/>
      <Count text={repository.forks.totalCount} icon={<ForkOutlined />}/>
    </p>
  </div>
)

const Count = ({ text, icon }) => (
  <span style={{margin: '0 5px'}}>{icon} {text}</span>
)

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
        pullRequests {
          totalCount
        }
        issues {
          totalCount
        }
        url
        watchers {
          totalCount
        }
        homepageUrl
        description
        name
        stargazers {
          totalCount
        }
        primaryLanguage {
          color
          id
          name
        }
        forks {
          totalCount
        }
      }
      totalCount
    }
  }
}
`