<template>
  <div class="about">
    <h1>测试 vue中 key的作用</h1>
    <p>试试都勾选第一个，再进行点击删除</p>
    <div style="display: flex">
      <div class="item">
        key为index
        <ul>
          <li v-for="(item, index) in list" :key="index">
            <input type="checkbox" :value="item.checked" />{{item.name}}
          </li>
          <button @click="handleDelete('list')">删除</button>
        </ul>
      </div>
      <div class="item">
        key为id
        <ul>
          <li v-for="item in list1" :key="item.name">
            <input type="checkbox" :value="item.checked" />{{item.name}}
          </li>
          <button @click="handleDelete('list1')">删除</button>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          {name: 1, checked: true},
          {name: 2, checked: false},
          {name: 3, checked: true},
          {name: 4, checked: false},
        ],
        list1: [
          {name: 1, checked: true},
          {name: 2, checked: false},
          {name: 3, checked: true},
          {name: 4, checked: false},
        ]
      }
    },
    methods: {
      handleDelete(type) {
        this[type].shift()
      }
    }
  }
</script>

<style scoped>
  li {
    list-style: none;
  }
  .item {
    border: 1px solid;
    width: 400px;
    height: 200px;
  }
</style>
