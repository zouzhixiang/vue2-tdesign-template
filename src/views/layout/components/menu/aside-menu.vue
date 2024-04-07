<template>
  <t-menu v-model="value" :expanded.sync="expanded" :width="['182px', '64px']" @change="menuChange" v-bind="$attrs" v-on="$listeners">
    <menu-item v-for="item in menu" :key="item.id" :menu-item="item"></menu-item>
  </t-menu>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin]
}
</script>
