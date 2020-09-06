import React, { useEffect, useState } from "react";

import {
  Link
} from "react-router-dom";

import CentreContainer from '../Shared/CentreContainer'
import Layout from '../Shared/Layout'

import { AutoComplete, Input } from 'antd';

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

  const onSearch = async (e) => {
    let searchText = e.target.value;
    if (searchText.length >= 2){
      const {search} = await graphqlWithAuth(searchUser(searchText));
      setData(search.nodes)
    } else {
      setData([])
    }
    console.log(data)
  };


  useEffect(() => {
    // (async () => {
    //   const {search} = await graphqlWithAuth(`
    //   {
    //     search(query: "maraja", type: USER, first: 10) {
    //       nodes {
    //         ... on User {
    //           id
    //           email
    //           bio
    //           name
    //           login
    //           url
    //         }
    //       }
    //     }
    //   }
    // `);
    // console.log(repository)
    // })()
  }, [])

  return (
    <Layout>
      <Input
        placeholder="input search text"
        onChange={onSearch}
        style={{ width: 200 }}
      />
      {data.map(user => <UserCard user={user} />)}
    </Layout>
  )
};

export default Home;


const UserCard = ({ user }) => (
  <div>
    <h1>{user.name}</h1>
    <h2>{user.login}</h2>
  </div>
)


const searchUser = username => `
{
  search(query: "${username}", type: USER, first: 10) {
    nodes {
      ... on User {
        id
        email
        bio
        name
        login
        url
      }
    }
  }
}
`