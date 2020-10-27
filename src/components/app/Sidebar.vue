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
import localizeFilter from '@/filters/localize.filter';

export default {
  name: 'Sidebar',

  props: ['value'],
  data() {
    return {
      routes: [
        { path: '/', name: localizeFilter('menu_bill'), exact: true },
        { path: '/history', name: localizeFilter('menu_history') },
        { path: '/planning', name: localizeFilter('menu_planning') },
        { path: '/record', name: localizeFilter('menu_newRecord') },
        { path: '/categories', name: localizeFilter('menu_categories') },
      ],
    };
  },
};
</script>
