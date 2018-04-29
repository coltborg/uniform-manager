<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>



<script>
import { mapActions } from 'vuex';

import Environment from '../environment';
import Configuration from '../services/configuration';

const URL_PARAM = 'access_token';

export default {
  mounted() {
    const urlToken = getUrlTokenValue(URL_PARAM);
    let token = null;
    if (urlToken) {
      window.localStorage.setItem(URL_PARAM, urlToken);
      token = urlToken;
    } else {
      token = window.localStorage.getItem(URL_PARAM);
    }
    if (!token) {
      redirectToLogin();
    }
    clearTokenFromHash();
    Configuration.accessToken = token;
    this.studentsInit();
  },
  methods: {
    ...mapActions('students',{ 
      studentsInit: 'init'
     })
  }
}

function redirectToLogin() {
  const token = window.localStorage.getItem("access_token");
  const uid = Environment.development.uid;
  const redirect = Environment.development.redirect;
  if (!token) {
    window.location = `https://be.contentful.com/oauth/authorize?response_type=token&client_id=${uid}&redirect_uri=${redirect}&scope=content_management_manage`;
  }
}

function getUrlTokenValue(key) {
  const hash = window.location.hash;
  const tokens = hash.split('&')
    .map(str => str.split('='))
    .map(arr => ({ key: (arr.length > 0 ? arr[0] : ''), value: (arr.length > 1 ? arr[1] : '')}))
    .map(token => {
      if (token.key.startsWith('#')) {
        token.key = token.key.substring(1)
      }
      return token;
    });
  const access_token = tokens.find(token => token.key === key);
  return (access_token || {}).value;
}

function clearTokenFromHash() {
  if (window.location.hash.indexOf(URL_PARAM) !== -1) {
    window.location.hash = '';
  } 
}
</script>