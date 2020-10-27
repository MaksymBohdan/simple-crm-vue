<template>
  <div>
    <div class="page-title">
      <h3>{{ 'profileTitle' | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required,
          }"
        />
        <label for="description">{{ 'name' | localize }}</label>
        <span class="helper-text invalid" v-if="$v.name.$error">{{
          'enterName' | localize
        }}</span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Russian
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable no-useless-return */

import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  metaInfo() {
    return { title: this.$title('profileTitle') };
  },
  data() {
    return {
      name: '',
      isRuLocale: true,
    };
  },
  validations: {
    name: { required },
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU';

    this.$nextTick(() => {
      M.updateTextFields();
    });
  },

  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    ...mapActions(['updateInfo']),
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US',
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
