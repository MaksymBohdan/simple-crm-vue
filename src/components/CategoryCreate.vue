<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
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
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  name: 'CategoryCreate',
  data() {
    return {
      title: '',
      limit: 1,
    };
  },
  validations: {
    title: { required },
    limit: { required, minValue: minValue(10) },
  },
  mounted() {
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        // eslint-disable-next-line no-useless-return
        return;
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        });

        this.title = '';
        this.limit = '1';
        this.$v.$reset();
        this.$message('Категория созднана');
        this.$emit('created', category);
      } catch (err) {
        console.log('err', err);
      }
    },
  },
};
</script>
