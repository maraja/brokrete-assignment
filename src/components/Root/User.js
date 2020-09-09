import gql from "graphql-tag";
import React, { Component, useState, useEffect } from "react";

import { Form, Typography, Pagination, Avatar, Input, Button, Select, message, Layout, Tabs, Row, Col, Badge, Skeleton, Tag } from 'antd';
// import { Layout } from 'antd';
const { Text } = Typography;

const { TabPane } = Tabs;
const { Header, Footer, Sider, Content } = Layout;

import { 
  StarOutlined, 
  ForkOutlined, 
  EnvironmentOutlined, 
  MailOutlined, 
  LinkOutlined,
  UserOutlined } from '@ant-design/icons';

import Container from '../Shared/Container'

import { Link } from 'react-router-dom'


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
      <Row gutter={[48, 16]}>
        <Col span={6} style={{background: 'white'}}>
          {data &&
            <React.Fragment>
              <img style={{
                width: '100%', 
                margin: '25px 0',
                borderRadius: '50%'}} src={data.avatarUrl} />

              <h2>{data.name}</h2>
              <p><Text type="secondary">{data.login}</Text></p>

              <Button type="outlined" style={{width: '100%'}}>Follow</Button><br/>
              <p style={{fontSize:12, marginTop:5}}>
              <Text type="secondary">
                <UserOutlined/> 
                {data.followers.totalCount} followers - {` `} 
                {data.following.totalCount} following - {` `} 
                <StarOutlined /> {data.starredRepositories.totalCount}
                </Text>
              </p>
              <Count margin="0 0" icon={<EnvironmentOutlined />} text={data.location} />
              <br/><Count margin="0 0" icon={<MailOutlined />} text={data.email} />
              <br/><Count margin="0 0" icon={<LinkOutlined />} text={<a href={data.url}>{data.url}</a>} />

            </React.Fragment>
          }
          {!data && <Skeleton.Image />}
          </Col>
        <Col span={18} style={{background: 'white'}}>
        <Tabs defaultActiveKey="1" onChange={() => {}}>
            <TabPane tab="Overview" key="1">
              {data && 
                <React.Fragment>
                  <h2>Popular Repositories</h2>
                  <PopularRepositories repositories={data.topRepositories.nodes} />
                </React.Fragment>
              }
              {!data && <Skeleton active />}
            </TabPane>
            <TabPane tab={`Repositories ${data ? "("+data.repositories.totalCount+")" : ''}`} key="2">
              Nothing to see here yet :(!
            </TabPane>
            <TabPane tab="Projects" key="3">
              Nothing to see here yet :(!
            </TabPane>
            <TabPane tab="Packages" key="4">
              Nothing to see here yet :(!
            </TabPane>
          </Tabs>
          </Col>
      </Row>
          
      </Container>
    </Layout>
  )
};

export default User;

const PopularRepositories = ({repositories}) => {
  let [current, setCurrent] = useState(1)

  let numPerPage = 6

  const onChange = page => {
    setCurrent(page)
  }

  return (
    <div> 
      <Row gutter={[16, 16]}>
        {repositories.slice(current*numPerPage, current*numPerPage + numPerPage).map(r => (
          <Col span={12}>
            <RepositoryCard repository={r} />
          </Col>
        ))}
        <br/><br/>
        <Pagination current={current} onChange={onChange} total={repositories.length} hideOnSinglePage={true} size={"small"} showSizeChanger={false}/>
      </Row>
    </div>
  )
}

const RepositoryCard = ({repository}) => (
  <div style={{ border: 'solid 1px #eee', padding: '10px 20px 0px 20px', borderRadius: 5 }}>
    <h3><Link to={repository.url}>{repository.name}</Link></h3>
    <p><Text type="secondary" style={{marginBottom: 10}}>{repository.description}</Text></p>
    <p>
      { repository.primaryLanguage && <Badge color={repository.primaryLanguage.color} text={repository.primaryLanguage.name}/> }
      <Count text={repository.stargazers.totalCount} icon={<StarOutlined />}/>
      <Count text={repository.forks.totalCount} icon={<ForkOutlined />}/>
    </p>
  </div>
)

const Count = ({ text, icon, margin }) => (
  <span style={{margin: margin || '0 10px'}}>{icon} {text}</span>
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
    topRepositories(orderBy: {field: CREATED_AT, direction: ASC}, first: 50) {
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
    url
    followers {
      totalCount
    }
    following {
      totalCount
    }
    repositories {
      totalCount
    }
    starredRepositories {
      totalCount
    }
  }
}

`