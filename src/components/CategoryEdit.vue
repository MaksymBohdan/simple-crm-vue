<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="category in categories"
              :value="category.id"
              :key="category.id"
              >{{ category.title }}</option
            >
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="{
              invalid: $v.title.$dirty && !$v.title.required,
            }"
          />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="$v.title.$error"
            >Введите название</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{
              invalid:
                ($v.limit.$dirty && !$v.limit) ||
                ($v.limit.$dirty && !$v.limit.required),
            }"
          />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="$v.limit.$error"
            >Минимальная величина {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

import { required, minValue } from 'vuelidate/lib/validators';

export default {
  props: ['categories'],
  data() {
    return {
      title: '',
      limit: 1,
      select: null,
      current: null,
    };
  },
  validations: {
    title: { required },
    limit: { required, minValue: minValue(10) },
  },
  watch: {
    current(id) {
      const { title, limit } = this.categories.find((c) => c.id === id);

      this.limit = limit;
      this.title = title;
    },
  },
  created() {
    const { id, limit, title } = this.categories[0];

    this.id = id;
    this.current = id;
    this.limit = limit;
    this.title = title;
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const updatedCategory = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };

        await this.$store.dispatch('updateCategory', updatedCategory);

        this.$v.$reset();
        this.$message('Категория обновлена');

        this.$emit('updated', updatedCategory);
      } catch (error) {
        console.log('err', error);
      }
    },
  },
};
</script>
