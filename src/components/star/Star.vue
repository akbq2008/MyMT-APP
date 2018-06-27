<template>
    <div class="star">
        <i class="fa " v-for="(itemClass,index) in initScore" :key="index" :class="itemClass"></i>
    </div>
</template>

<script>
// 星星长度
const LENGTH = 5;
// 星星的状态
const CLS_ON = "fa-star";
const CLS_HALF = "fa-star-half-empty";
const CLS_OFF = "fa-star off";
export default {
  props: {
    score: {
      type: Number
    }
  },
  data() {
    return {};
  },
  computed: {
    initScore() {
      let result = [];
      //全星
      let all = Math.floor(this.score);
      for (let i = 0; i < all; i++) {
        result.push(CLS_ON);
      }
      if (this.score % 1 != 0) {
        //半星
        result.push(CLS_HALF);
      }
      //处理剩余的
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style scoped>
.star {
  display: inline-block;
}
/* 默认颜色 */
.fa-star:before,
.fa-star-half-empty {
  color: yellow;
}
i.off.fa-star:before {
  color: #bfbfbf;
}
</style>