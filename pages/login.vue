<template>
  <div></div>
</template>

<script>
// This page is only used when the user directly loads a page which needs login.
export default {
  name: "LoginPage",
  auth: false,
  nuxtI18n: false,
  mounted() {
    this.$auth.loginWith('oidc');
  },
};
</script>
