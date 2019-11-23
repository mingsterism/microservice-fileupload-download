<template>
  <div>
    <slot name="main" :mainMethod="sayHi" v-bind:username="name"></slot> <br />
    <slot>The Default content {{ name }}</slot> <br />
    <slot name="footer" :sayHi="sayHi" :shout="shout"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "TestSlot"
    };
  },
  methods: {
    sayHi(e) {
      console.log("Hi", e);
      this.name = "Randal";
      return "YAAA";
    },
    shout() {
      console.log("Shoting");
      return "shout";
    }
  }
};
</script>
