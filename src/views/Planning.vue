<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill | currency('RUB') }}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий нет. <router-link to="/categories">Добавить</router-link>
    </p>

    <section v-else>
      <div v-for="c in categories" :key="c.id">
        <p>
          <strong>{{ c.title }}</strong>
          {{ c.spent | currency }} из {{ c.limit | currency }}
        </p>
        <div class="progress" v-tooltip="c.tooltip">
          <div
            class="determinate"
            :class="[c.progressColor]"
            :style="{ width: c.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable operator-linebreak */

import { mapGetters } from 'vuex';
import currencyFilter from '@/filters/currency.filter';

export default {
  name: 'Planning',
  data() {
    return {
      loading: true,
      categories: [],
    };
  },

  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.categories = categories.map((c) => {
      const spent = records
        .filter((r) => r.categoryId === c.id)
        .filter((r) => r.type === 'outcome')
        .reduce((acc, r) => Number(r.amount) + acc, 0);

      const progressPercent = (100 * spent) / c.limit;
      const progressColor =
        progressPercent < 60
          ? 'green'
          : progressPercent < 100
          ? 'yellow'
          : 'red';

      const tooltipValue = c.limit - spent;
      const tooltip = `${
        tooltipValue < 0 ? 'Превышение на ' : 'Осталось'
      } ${currencyFilter(Math.abs(tooltipValue))}`;
      return {
        ...c,
        progressPercent,
        progressColor,
        spent,
        tooltip,
      };
    });
    this.loading = false;
  },

  computed: { ...mapGetters(['info']) },
};
</script>
