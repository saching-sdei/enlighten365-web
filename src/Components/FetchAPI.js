/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";

export default FetchAPI = (props) => {
  fetch(props.apiURL, {
    method: props.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: props.body,
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log('responseJson>>>', responseJson);
      this.setState({ foodItemList: responseJson.common });
    })
    .catch(error => {
      this.setState({ isLoading: false });
    });
}