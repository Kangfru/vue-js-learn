<template>
  <v-container>
    <div>
      <post-card
        v-for="p in mainPosts"
        :key="p.id"
        :post="p"
      />
    </div>
  </v-container>
</template>

<script>
    import PostCard from "~/components/PostCard";

    export default {
        name: "Index",
        components: {
            PostCard,
        },
        fetch({store}) {
            // vuex 스토어에 비동기적으로 데이터를 넣을 때.
            store.dispatch('posts/loadPosts');
        },
        data() {
            return {
                name: 'Nuxt.js',
            }
        },
        computed: {
            me() {
                return this.$store.state.users.me;
            },
            mainPosts() {
                return this.$store.state.posts.mainPosts;
            },
            hasMorePost() {
                return this.$store.state.posts.hasMorePost;
            },
        },
        mounted() {
            // window에는 created 에서 못씀 mount 된 후 쓰는게 안전
            window.addEventListener('scroll', this.onScroll);
        },
        beeforeDestroy() {
            window.removeEventListener('scroll', this.onScroll);
        },
        methods: {
            onScroll() {
                if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                    if(this.hasMorePost){
                        this.$store.dispatch('posts/loadPosts');
                    }
                }
            },
        },
    };
</script>

<style scoped>

</style>
