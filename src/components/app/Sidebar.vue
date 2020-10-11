<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      tag="li"
      active-class="active"
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      :exact="route.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ route.name }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Sidebar',

  props: ['value'],
  data() {
    return {
      routes: [
        { path: '/', name: 'Счет', exact: true },
        { path: '/history', name: 'История' },
        { path: '/planning', name: 'Планирование' },
        { path: '/record', name: 'Новая запись' },
        { path: '/categories', name: 'Категории' },
      ],
    };
  },
};
</script>
