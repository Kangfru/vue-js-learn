<template>
  <v-list-title>
    <ul>
      <li>
        <span>{{ data.nickname }}</span>
        <v-btn
          @click="deleteBtnClick"
        >
          <v-icon>mdi-minus-circle-outline</v-icon>
        </v-btn>
      </li>
    </ul>
  </v-list-title>
</template>

<script>
    export default {
      props: {
        data: {
          type: Object,
          required: true,
        },
        followDis: {
          type: Number,
          required: true,
        }
      },
      methods: {
        deleteBtnClick() {
          this.$store.dispatch('users/removeFollow', {
            email: this.data.email,
            followDis: this.followDis,
          });
        }
      }
    }
</script>

<style scoped>

</style>
