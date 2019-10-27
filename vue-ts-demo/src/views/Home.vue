<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld v-for="blogList in blogPosts"
                :key="blogList.title"
                :post="blogList"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  import HelloWorld, {Post} from '@/components/HelloWorld.vue'

  @Component({
    components: {
      HelloWorld
    }
  })

  export default class Home extends Vue {
    private blogPosts: Post[] = [
      {
        title: 'My first blogpost ever!',
        body: 'Hello ds',
        author: '哈哈',
        dataPosted: new Date(2019, 1, 18)
      },
      {
        title: 'My second blogpost ever!',
        body: 'Hello sun',
        author: '嘎嘎',
        dataPosted: new Date(2019, 1, 19)
      }
    ];
  }
</script>
