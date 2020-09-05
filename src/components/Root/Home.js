import React, { useEffect } from "react";

import {
  Link
} from "react-router-dom";

import CentreContainer from '../Shared/CentreContainer'
import Layout from '../Shared/Layout'

import config from '../../config'
console.log(config)

const { graphql } = require("@octokit/graphql");

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `bearer ${config.github_token}`,
  },
});



const Home = ({}) => {


  useEffect(() => {
    (async () => {
      const { repository } = await graphqlWithAuth(`
      {
        repository(owner: "maraja", name: "league-side") {
          issues(last: 3) {
            edges {
              node {
                title
              }
            }
          }
        }
      }
    `);
    console.log(repository)
    })()
  }, [])

  return (
    <Layout>
    <CentreContainer>
      <h1>Welcome home!</h1>
    </CentreContainer>
    </Layout>
  )
};

export default Home;
