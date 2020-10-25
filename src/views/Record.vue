<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий нет. <router-link to="/categories">Добавить</router-link>
    </p>
    <form v-else class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">{{
            c.title
          }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{
            invalid:
              ($v.amount.$dirty && !$v.amount) ||
              ($v.amount.$dirty && !$v.amount.required),
          }"
        />
        <label for="amount">Сумма</label>
        <span class="helper-text invalid" v-if="$v.amount.$error"
          >Минимальная величина {{ $v.amount.$params.minValue.min }}</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required,
          }"
        />
        <label for="description">Описание</label>
        <span class="helper-text invalid" v-if="$v.description.$error"
          >Введите описание</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
/* eslint-disable no-unused-expressions */
/* eslint-disable-next-line no-useless-return */
/* eslint-disable operator-linebreak */
/* eslint-disable no-undef */

import { required, minValue } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  name: 'Record',
  data() {
    return {
      categories: [],
      loading: true,
      select: null,
      category: null,
      type: 'income',
      amount: 1,
      description: '',
    };
  },
  validations: {
    description: { required },
    amount: { required, minValue: minValue(10) },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    this.$nextTick(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    });
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecords() {
      if (this.type === 'income') {
        true;
      }

      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();

        return;
      }
      try {
        if (this.canCreateRecords) {
          const newRecord = {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          };

          await this.$store.dispatch('createRecord', newRecord);

          const bill =
            this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;

          await this.$store.dispatch('updateInfo', { bill });
          this.$message('Запись успешно создана');
          this.$v.$reset();

          this.amount = 1;
          this.description = '';
        } else {
          this.$message(
            `недостаточно средств на счете ${this.amount - this.info.bill}`,
          );
        }
      } catch (err) {
        console.log('err', err);
      }
    },
  },
};
</script>
