<template>
  <t-head-menu v-model="value" :expanded.sync="expanded" expand-type="popup" @change="menuChange" v-bind="$attrs" v-on="$listeners">
    <menu-item v-for="item in menu" :key="item.id" :menu-item="item"></menu-item>
  </t-head-menu>
</template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin]
}
</script>
