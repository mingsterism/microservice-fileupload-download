<template>
  <!-- <test> this is a slot {{ name }} </test> -->
  <test>
    <template v-slot:main="sloty">
      this is the top tag {{ name }} {{ sloty }}
    </template>
    <template v-slot:footer="{ sayHi, shout }">
      <!-- this is the footer tag {{ sayHi() }} this is the footer tag {{ shout() }} -->
      <button @click="sayHi(name)">CLICKME</button>
    </template>
    <template v-slot:default> </template>
  </test>
</template>

<script>
import Test from "@/components/Test.vue";
export default {
  components: {
    Test
  },
  data() {
    return {
      name: "Parent",
      values: ""
    };
  },
  methods: {
    parentHi() {
      console.log(e);
    }
  }
};
</script>
