import React, { useEffect, useState } from "react";

import {
  Link
} from "react-router-dom";

import CentreContainer from '../Shared/CentreContainer'
import Layout from '../Shared/Layout'

import { AutoComplete } from 'antd';

import config from '../../config'
console.log(config)

const { graphql } = require("@octokit/graphql");

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `bearer ${config.github_token}`,
  },
});



const Home = ({}) => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = async (searchText) => {
    if (searchText.length >= 2){
      const {search} = await graphqlWithAuth(searchUser(searchText));
      setOptions(search.nodes.map(n => { return {value: `${n.name} | ${n.login}`} }))
    } else {
      setOptions([])
    }
    // setOptions([{ value: "some random string" }]);
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    setValue(data);
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
    <CentreContainer>
      <h1>Welcome home!</h1>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="input here"
      />
    </CentreContainer>
    </Layout>
  )
};

export default Home;


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