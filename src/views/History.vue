<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">Записей нет</p>

    <section v-else>
      <HistoryTable :records="items" />
      <paginate
        v-model="page"
        :page-count="pageCount"
        :margin-pages="2"
        :click-handler="onPaginationChange"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      >
      </paginate>
    </section>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */

import { Pie } from 'vue-chartjs';
import paginationMixin from '@/mixins/pagination.mixin';
import HistoryTable from '@/components/HistoryTable.vue';

export default {
  name: 'History',
  extends: Pie,
  mixins: [paginationMixin],
  data() {
    return {
      loading: true,
      records: [],
    };
  },
  components: {
    HistoryTable,
  },

  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.setup(categories);

    this.loading = false;
  },

  methods: {
    setup(categories) {
      const modifiedRecords = this.records.map((record) => ({
        ...record,
        categoryName: categories.find((c) => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      }));

      this.setupPagination(modifiedRecords);

      this.renderChart({
        labels: categories.map(({ title }) => title),
        datasets: [
          {
            label: 'Расходы по категориями',
            backgroundColor: ['#f87979', '#4caf50', '#b3e5fc'],
            data: categories.map((c) =>
              this.records.reduce((acc, r) => {
                if (r.categoryId === c.id && r.type === 'outcome') {
                  acc += r.amount;
                }
                return acc;
              }, 0),
            ),
          },
        ],
      });
    },
  },
};
</script>
