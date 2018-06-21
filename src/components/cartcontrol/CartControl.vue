<template>
  <div class="goods_control">
    <transition name="move">
      <!-- 商品减少 -->
      <div class="cart_minus" v-show="items.count" @click="decreaseNum">
        <span>-</span>
      </div>
    </transition>
    <span class="goods_num" v-show="items.count">{{items.count}}</span>
    <!-- 商品增加-->
    <div class="cart_add" @click="increaseNum">
      <span>+</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    items: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    // 增加商品的个数
    increaseNum() {
      if (!this.items.count) {
        //添加3个参数，添加的对象，添加的键名，键值
        Vue.set(this.items, "count", 1);
      } else {
        this.items.count++;
      }
    },
    //减少商品的个数
    decreaseNum() {
      this.items.count--;
    }
  }
};
</script>

<style scoped>
.goods_control {
  display: flex;
  align-items: center;
}
.cart_add {
  width: 22px;
  height: 22px;
  border-radius: 11px;
  text-align: center;
  line-height: 22px;
  background: #ffbb22;
  font-size: 20px;
  cursor: pointer;
}
.cart_minus {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  line-height: 16px;
  text-align: center;
  font-size: 20px;
  color: rgb(158, 157, 156);
  border: 1px solid rgb(158, 157, 156);
  cursor: pointer;
  background: white;
}
.goods_num {
  padding: 0 5px;
}
/* 增减动画 */
.move-enter-active,
.move-leave-active {
  transition: all 0.5s linear;
}
.move-enter,
.move-leave-to {
  transform: translateX(20px) rotate(180deg);
}
</style>