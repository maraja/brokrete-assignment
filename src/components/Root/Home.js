import React, { useEffect, useState } from "react";

import {
  Link
} from "react-router-dom";

import CentreContainer from '../Shared/CentreContainer'
import Layout from '../Shared/Layout'

import { AutoComplete, Input, List, Avatar, Pagination } from 'antd';

const { Search } = Input;

import config from '../../config'
console.log(config)

const { graphql } = require("@octokit/graphql");

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `bearer ${config.github_token}`,
  },
});



const Home = ({}) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const onSearch = async (e) => {
    let query = e.target.value;
    setSearchText(query)
    if (query.length >= 2){
      const {search} = await graphqlWithAuth(searchUser(query));
      setData(search.nodes)
    } else {
      setData([])
    }
    console.log(data)
  };


  useEffect(() => {
  }, [])

  return (
    <Layout>
      <Input
        placeholder="Search users"
        onChange={onSearch}
      />
      <UserList data={data} searchText={searchText}/>
    </Layout>
  )
};

export default Home;


const UserList = ({ data, searchText }) => {
  let [current, setCurrent] = useState(1)

  let numPerPage = 5

  const onChange = page => {
    setCurrent(page)
  }

  return (
    <div>
    <br/>
    {data.length > 0 && 
      <React.Fragment>
      <h2>{data.length} User(s)</h2>
      <List
        itemLayout="horizontal"
        dataSource={data.slice(current*numPerPage, current*numPerPage + numPerPage)}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatarUrl} />}
              title={
                <React.Fragment>
                  <Link to={`/user/${item.login}`}>
                    <a>{item.name}{`      `}</a>
                    {/*{getHighlightedText(item.name, searchText)}{`   `} */} 
                  </Link>
                  <span>{item.login}</span>
                </React.Fragment>
              }
              description={
                <React.Fragment>
                  {item.bio && 
                    <p>{item.bio}<br/></p>
                  }
                  <i>{item.location}</i>
                </React.Fragment>
              }
            />
          </List.Item>
        )}
      />
      <br/>
      <Pagination current={current} onChange={onChange} total={data.length} hideOnSinglePage={true} size={"small"} showSizeChanger={false}/>
      </React.Fragment>
    }
    </div>
  )
}

const getHighlightedText = (text, highlight) => {
    if (text && highlight && text.length > 0 && highlight.length > 0) {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
    } </span>;
  } else {
    return null
  }
}

const searchUser = username => `
{
  search(query: "${username}", type: USER, first: 100) {
    nodes {
      ... on User {
        id
        email
        bio
        name
        login
        url
        avatarUrl
        location
      }
    }
  }
}
`