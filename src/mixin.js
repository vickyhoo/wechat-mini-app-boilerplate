import Vue from 'vue'
import { navigateBack } from './wx'

export default {
  created() {},
  computed: {
    CustomBar() {
      return Vue.prototype.CustomBar
    }
  },
  methods: {
    navigateBack
  }
}
