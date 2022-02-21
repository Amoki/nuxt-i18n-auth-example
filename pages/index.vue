<template>
  <div>
    <p>{{ $t('welcome') }}</p>
    <p>{{$auth.loggedIn}}</p>
    <p>{{$auth.user }}</p>
    <p>{{$auth.user && $auth.user.email}}</p>
    <p>PUBLIS APPS</p>
    <p v-for="app in apps" :key="app.id">
      {{app}}
    </p>
    <p>ORG APPS</p>
    <p v-for="orgApp in orgApps" :key="orgApp.id">
      {{orgApp}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  auth: false,
  data () {
    return {
      apps: [],
      orgApps: [],
    };
  },
  async fetch() {
    this.apps = await this.$axios.$get(`${process.env.API_URL}/private/marketplace-apps`);
    try {
      const organizations = await this.$axios.$get(
        `${process.env.API_URL}/private/organization`,
      );

      this.orgApps = await this.$axios.$get(
        `${process.env.API_URL}/private/organization/${organizations[0].id}/marketplace-app`,
      );
    } catch(e)  {
      console.log('OSEF')
    }
  }
}
</script>
  