<template>
    <div>
        <h1>首页</h1>
        <router-link to="/about">跳转到about</router-link><br/>
        {{count}}
        <button @click="handleIncrement">+1</button>
        <button @click="handleDecrease">-1</button>
        <div>
            随机增加：
            <Counter :number="number"></Counter>
        </div>
    </div>
</template>
<script>
    import Counter from "./counter.vue";

    export default {
        components: {
            Counter
        },
        data() {
            return {
                number: 0
            }
        },
        created() {
            this.$bus.on('add', this.handleAddRandom);
        },
        beforeDestroy() {
            this.$bus.off('add', this.handleAddRandom);
        },
        computed: {
            count() {
                return this.$store.state.count;
            }
        },
        methods: {
            handleAddRandom(num) {
                this.number += num;
            },
            handleIncrement() {
                this.$store.commit('increment');
            },
            handleDecrease() {
                this.$store.commit('decrease');
            }
        }
    }
</script>