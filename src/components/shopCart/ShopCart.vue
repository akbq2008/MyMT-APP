<template>
  <div class="shop_cart">
    <!-- shop_cart_left -->
    <div class="shop_cart_left">
      <div class="shop_icon_wrap" @click="show_detail" :class="{'activeClass':totalCount>0}">
        <i v-show="totalCount" class="shop_num">{{totalCount}}</i>
        <svg class="icon" aria-hidden="true" width="32px" height="32px">
          <use xlink:href="#icon-gouwuche"></use>
        </svg>
      </div>
      <p v-show="totalMoney" class="totalMoney">￥{{totalMoney}}</p>
      <p>另需{{poi_info.shipping_fee_tip}}
      </p>
    </div>
    <!-- shop_cart_left -->
    <!-- shop_cart_right -->
    <div class="shop_cart_right" :class="{'activeClass':totalCount>0}">
      <p v-show="!totalCount">{{poi_info.min_price_tip}}</p>
      <p v-show="totalCount">去结算</p>
    </div>
    <!-- shop_cart_right -->
    <!-- 购物车明细 -->
    <div class="shop_cart_detail" v-show="isShow&&totalCount>0">
      <h3 class="newer_coupon" v-if="poi_info.discounts2">
        {{poi_info.discounts2[0].info}}
      </h3>
      <div class="detail_title">
        <div class="detail_title_left">
          <i></i>
          <span>1号口袋</span>
        </div>
        <div class="detail_title_right">
          <div @click="empty">
            <img src="./img/ash_bin.png" alt="清空">
            <span>清空购物车</span>
          </div>
        </div>
      </div>
      <!-- 购物车中的商品内容 -->
      <div class="goods_detail_wrap" ref="goods_detail_wrap">
        <ul>
          <li v-for="(items,index) in selectFood" :key="index" class="goods_detail_item">
            <ul class="goods_detail_content">
              <li>
                <span>{{items.name}}</span>
                <span class="goods_unit">{{items.unit}}</span>
              </li>
              <li>￥{{items.total}}</li>
              <!-- 这里用不能直接用2个相乘。。得在以为是props传值，得在父组件里面先算好，再传过来 -->
              <li>
                <cartControl :items="items" :selectFood="selectFood" :isShow="isShow" @changeIs="changeIs($event)"></cartControl>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车明细 -->
  </div>
</template>

<script>
import CartControl from "../cartControl/CartControl";
import Bscroll from "better-scroll";
export default {
  components: {
    cartControl: CartControl
  },
  props: {
    goods: {
      type: Array,
      default: function() {
        return [];
      }
    },
    poi_info: {
      type: Object
    },
    selectFood: {
      type: Array,
      dafault() {
        // return [];
      }
    }
  },
  data() {
    return {
      isShow: false //是否显示
    };
  },
  computed: {
    //总个数
    totalCount() {
      let count = 0;
      this.selectFood.forEach(element => {
        count += element.count;
      });
      return count;
    },
    //总金额
    totalMoney() {
      let money = 0;
      this.selectFood.forEach(element => {
        money += element.count * element.min_price;
      });
      return money;
    }
  },
  watch: {
    isShow() {
      this.$nextTick(() => {
        // 必须保证DOM加载完毕
        if (this.isShow) {
          this.goods_detail_wrap = new Bscroll(this.$refs.goods_detail_wrap);
        }
      });
    }
  },
  methods: {
    show_detail() {
      this.isShow = !this.isShow;
    },
    empty() {
      //直接清空购物车信息
      this.selectFood.forEach(element => {
        if (element.count > 0) {
          element.count = 0;
        }
      });
      this.isShow = !this.isShow;
    },
    changeIs(data) {
      this.isShow = data;
    }
  }
};
</script>

<style scoped>
.shop_cart {
  position: relative;
  display: flex;
  align-items: center;
}
.shop_cart_left {
  flex: 1;
}
.shop_icon_wrap {
  width: 50px;
  height: 50px;
  background: #666;
  border-radius: 25px;
  position: absolute;
  left: 20px;
  top: -15px;
}
.shop_icon_wrap svg {
  position: absolute;
  left: 7px;
  top: 7px;
}
.shop_cart p {
  font-size: 12px;
  color: #bab9b9;
  margin-left: 80px;
}

.shop_cart_right {
  font-size: 15px;
  color: #bab9b9;
  font-weight: bold;
  display: flex;
  line-height: 51px;
  justify-content: center;
}
.shop_cart_right p {
  flex: 0 0 130px;
}
.shop_num {
  position: absolute;
  right: 0;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  background: red;
  border-radius: 7.5px;
  color: white;
}
/* 购物车有商品时 */
p.totalMoney {
  font-size: 16px;
  color: white;
}
.activeClass {
  background: #ffd161;
}
.activeClass p {
  color: black;
  font-size: 16px;
}
/* 购物车明细 */
.newer_coupon {
  text-align: center;
  height: 30px;
  line-height: 30px;
  background: #f3e6c6;
  color: #646158;
}
.shop_cart_detail {
  position: absolute;
  bottom: 50px;
  z-index: -1;
  width: 100%;
  height: 165px;
  overflow: hidden;
  background: #fff;
}
.detail_title {
  display: flex;
  background: #f4f4f4;
  line-height: 30px;
}
.detail_title_left {
  flex: 0 0 80px;
}
.detail_title_left i {
  display: inline-block;
  height: 30px;
  width: 4px;
  background: #53c123;
  vertical-align: middle;
  margin-right: 2px;
}
.detail_title_right {
  flex: 1;
}
.detail_title_right div {
  float: right;
  margin-right: 10px;
}
.detail_title_right img {
  display: inline-block;
  vertical-align: middle;
  width: 14px;
}
.detail_title_right span {
  vertical-align: middle;
}
.goods_detail_wrap {
  height: 100px;
  overflow: hidden;
}
.goods_detail_content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.goods_detail_item {
  padding: 5px 0;
  font-family: "微软夜黑";
}
.goods_detail_content li {
  flex: 1;
}
.goods_detail_content li:last-of-type {
  flex: 2;
}
.goods_detail_content li:first-of-type {
  flex: 6;
  padding-left: 10px;
}
.goods_unit {
  float: right;
  margin-right: 10px;
}
</style>