<template>
  <div class="shop_cart">
    <div class="shop_cart_left">
      <div class="shop_icon_wrap">
        <i v-show="totalCount" class="shop_num">{{totalCount}}</i>
        <svg class="icon" aria-hidden="true" width="32px" height="32px">
          <use xlink:href="#icon-gouwuche"></use>
        </svg>
        <p v-show="totalMoney">{{totalMoney}}</p>
      </div>
      <p>另需{{poi_info.shipping_fee_tip}}
      </p>
    </div>
    <div class="shop_cart_right">
      <p>{{poi_info.min_price_tip}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
      goodsNum: 0 //商品的数量
    };
  },
  computed: {
    //一个总个数
    totalCount() {
      let count = 0;
      this.selectFood.forEach(element => {
        count += element.count;
      });
      return count;
    },
    //一个总金额
    totalMoney() {
      let money = 0;
      this.selectFood.forEach(element => {
        money += element.count * element.min_price;
      });
      return money;
    }
  },
  created() {}
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
.shop_cart p:first-of-type {
  font-size: 12px;
  color: #bab9b9;
  margin-left: 80px;
  line-height: 51px;
  flex-grow: 1;
}
.shop_cart p span {
  font-weight: bold;
}
.shop_cart_right {
  font-size: 15px;
  color: #bab9b9;
  font-weight: bold;
  display: flex;
  justify-content: center;
}
.shop_cart_right p {
  flex: 0 0 110px;
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
</style>