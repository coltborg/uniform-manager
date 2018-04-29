<template lang="pug">
  div.font-sans.text-black
    header.text-green.bg-green-lightest
      h1.mb-4.text-2xl.text-center Global Header (Goes Here)
      .mx-4
        nuxt-link.mr-4.text-green.no-underline(to="/") Home
        nuxt-link.text-green.no-underline(to="students") Students
    nuxt
</template>

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
    this.equipmentsInit();
  },
  methods: {
    ...mapActions('students',{ 
      studentsInit: 'init'
     }),
     ...mapActions('equipment', {
       equipmentsInit: 'init'
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
