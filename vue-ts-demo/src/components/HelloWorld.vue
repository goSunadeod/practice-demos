<template>
  <div class="blogpost">
    <h2>{{post.title}}</h2>
    <h2>{{post.body}}</h2>
    <p class="meta">Written by {{post.author}} on {{date}}</p>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  // 类型约束
  export interface Post {
    title: string;
    body: string;
    author: string;
    dataPosted: Date;
  }

  @Component
  export default class HelloWorld extends Vue {
    @Prop() private post!: Post;

    get date() {
      return `${this.post.dataPosted.getDate()}/${this.post.dataPosted.getMonth()}/${this.post.dataPosted.getFullYear()}`
    }
  }
</script>

<style scoped>
  h2 {
    text-decoration: underline;
  }
  p.meta {
    font-style: italic;
  }
</style>
