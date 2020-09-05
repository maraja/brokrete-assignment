import gql from "graphql-tag";
import React, { Component, useState, useEffect } from "react";

import { Form, Input, Button, Select, message } from 'antd';

import Layout from '../Shared/Layout'
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
    <Layout>
    <h1>User info.</h1>
    </Layout>
  )
};

export default User;
