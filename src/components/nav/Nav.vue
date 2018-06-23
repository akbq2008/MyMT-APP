<template>
  <div class="nav">
    <div class="nav_container">
      <!-- 背景 -->
      <img :src="initData.head_pic_url" alt="" class="nav_pic">
      <!-- nav导航条 -->
      <div class="nav_warpper">
        <svg class="icon" aria-hidden="true" width="16px" height="16px" fill="white">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <input type="text" class="nav_search" placeholder="搜索店内商品">
        <svg class="icon" aria-hidden="true" width="16px" height="16px" fill="white">
          <use xlink:href="#icon-pindanguanli"></use>
        </svg>
        <svg class="icon" aria-hidden="true" width="20px" height="20px" fill="white">
          <use xlink:href="#icon-more_light"></use>
        </svg>
      </div>
      <!-- nav导航条 -->
      <!-- 餐厅信息 -->
      <div class="restaurant_mes">
        <img :src="initData.pic_url" alt="" class="restaurant_pic">
        <h2 class="restaurant_name">{{initData.name}}</h2>
        <!-- 餐厅收藏 -->
        <div class="restaurant_collection_box">
          <img src="../header/img/star.png" alt="" class="restaurant_collection">
          <p>收藏</p>
        </div>
        <!-- 餐厅优惠信息 -->
        <div class="restaurant_coupon_mes" v-if="initData.discounts2">
          <img :src="initData.discounts2[0].icon_url" alt="">
          <span>{{initData.discounts2[0].info}}</span>
          <!-- 餐厅活动 -->
          <div class="restaurant_activity" @click="getInfo">
            <span>{{initData.discounts2.length}}个活动</span>
            <svg class="icon" aria-hidden="true" width="16px" height="16px" fill="white">
              <use xlink:href="#icon-xiangqian"></use>
            </svg>
          </div>
        </div>
      </div>
      <!-- 餐厅信息 -->
      <!-- 餐厅信息遮罩层 -->
      <div class="restaurant_container" v-show="isShow">
        <div class="restaurant_wrap" v-if="restaurant_info.discounts2">
          <img :src="restaurant_info.poi_back_pic_url" alt="">
          <img :src="initData.pic_url" alt="" class="restaurant_pic">
          <h2 class="mask_name">{{restaurant_info.name}}</h2>
          <!-- 评分 -->
          <p class="span_box">
            <span>{{restaurant_info.min_price_tip}}</span>
            <span>{{restaurant_info.shipping_fee_tip}}</span>
            <span>{{restaurant_info.delivery_time_tip}}</span>
          </p>
          <!-- 配送时间 -->
          <p class="delivery_time">配送时间：{{restaurant_info.shipping_time}}</p>
          <span class="hortionzal_line"></span>
          <img :src="restaurant_info.discounts2[0].icon_url" alt="">
          <span class="mask_coupon">{{restaurant_info.discounts2[0].info}}</span>
        </div>
        <!-- 关闭遮罩层 -->
        <svg class="icon" @click="getInfo" aria-hidden="true" width="16px" height="16px" fill="white">
          <use xlink:href="#icon-guanbi"></use>
        </svg>
      </div>
      <!-- 餐厅信息遮罩层 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initData: {}, //餐厅信息初始化
      restaurant_info: {}, //餐厅的具体信息
      isShow: false //控制是否显示
    };
  },
  created() {
    getNavData: {
      this.$axios
        .get("/api/seller")
        .then(data => {
          var result = data.data.data;
          this.initData = result;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    // 控制遮罩层是否显示
    getInfo() {
      this.$axios
        .get("/api/goods")
        .then(data => {
          var result = data.data.data.poi_info;
          this.restaurant_info = result;
        })
        .catch(err => {
          console.log(err);
        });
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style scoped>
.nav_container {
  position: relative;
  // height: 100vh;
}
.nav_pic {
  position: absolute;
  height: 150px;
  width: 100%;
  background-size: 100% 100%;
  line-height: 150px;
}
.nav_warpper {
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 20px;
}
/*餐厅的具体信息*/
.restaurant_mes {
  position: relative;
  top: 30px;
  padding-left: 10px;
  // margin-left: 10px;
}
.restaurant_pic {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  vertical-align: middle;
}
.restaurant_name {
  margin-left: 10px;
  font-size: 14px;
  vertical-align: middle;
  color: #f4f4f4;
  font-weight: bold;
  display: inline-block;
}
.restaurant_collection_box {
  text-align: center;
  float: right;
  margin-right: 20px;
}
.restaurant_collection {
  width: 20px;
  margin-bottom: 5px;
}
.restaurant_mes p {
  color: #f4f4f4;
}
.nav_warpper svg {
  flex: 1;
}
.nav_search {
  outline: none;
  line-height: 20px;
  border-style: none;
  padding-left: 25px;
  background: url("img/search.png") 8px center no-repeat #f4f4f4;
  background-size: 15px;
  border-radius: 10px;
}
.restaurant_coupon_mes {
  margin-top: 15px;
}
.restaurant_coupon_mes img,
.restaurant_wrap img:last-of-type {
  width: 16px;
  vertical-align: middle;
}
.restaurant_wrap span {
  vertical-align: middle;
}

.restaurant_coupon_mes span:first-of-type {
  color: #fff;
  width: 70%;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
}
.restaurant_activity {
  float: right;
  width: 70px;
}
.restaurant_coupon_mes span:last-of-type {
  color: #fff;
  vertical-align: middle;
}
.restaurant_coupon_mes svg {
  vertical-align: middle;
  margin-left: -7px;
}
/*餐厅的具体信息*/
/* 餐厅遮罩层信息*/
.restaurant_container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: rgba(98, 98, 98, 0.8);
  z-index: 2;
}

.restaurant_wrap {
  text-align: center;
}
.restaurant_wrap img:first-of-type {
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  z-index: -1;
  left: 0;
  right: 0;
}
.mask_name {
  color: #f4f4f4;
  margin-top: 10px;
  font-family: "微软雅黑";
}
.span_box span {
  color: rgba(141, 140, 140, 0.603);
  padding: 0 10px;
  border-right: 1px solid rgba(141, 140, 140, 0.603);
}
.delivery_time {
  margin: 10px 0;
  color: rgba(141, 140, 140, 0.603);
}
.hortionzal_line {
  display: block;
  width: 90%;
  margin: 15px auto;

  border-bottom: 2px solid rgba(141, 140, 140, 0.603);
}
.mask_coupon {
  font-size: 10px;
  color: #fff;
}
/* 餐厅遮罩层信息*/
</style>