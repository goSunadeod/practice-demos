<template>
    <main>
        <Header></Header>
        <nav-bar></nav-bar>
         <nav-bar1></nav-bar1>
    </main>
</template>

<script>
import Header from '@/components/header';
import NavBar from '@/components/nav-bar';
import NavBar1 from '@/components/nav-bar1';

export default {
    name: 'layout',
    components: {
        Header,
        NavBar,
        NavBar1
    }
};
</script>

<style>
</style>
