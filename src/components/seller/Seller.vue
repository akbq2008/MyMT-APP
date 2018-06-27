<template>
    <div class="seller_wrap">
        <div class="seller">
            <split></split>
            <div class="seller_content">
                <!-- 地址 -->
                <div class="addess_wrap">
                    <div class="address_left">
                        <img src="./img/address.png" alt="">
                        <span class="address">{{initData.address}}</span>
                    </div>
                    <div class="telephone_right">
                        <img src="./img/phone.png" alt="">
                    </div>
                </div>
                <!-- 餐厅图片 -->
                <div class="pic_wrap">
                    <ul class="pic_list" ref="pic_list">
                        <li v-for="(item,index) in pic" :key="index">
                            <img :src="item" alt="">
                        </li>
                    </ul>
                </div>
                <!-- 食品安全档案 -->
                <div class="goods_security address_left">
                    <img src="./img/safety.png" alt="">
                    <span>查看食品安全档案</span>
                </div>
                <split></split>
                <!-- 配送服务 -->
                <div class="goods_security address_left">
                    <img src="./img/delivery.png" alt="">
                    <span>配送服务：{{initData.app_delivery_tip}}</span>
                </div>
                <!-- 配送时间 -->
                <div class="goods_security address_left">
                    <img src="./img/time.png" alt="">
                    <span>配送时间：{{initData.shipping_time}}</span>
                </div>
                <split></split>
                <!-- 商家服务 -->
                <div class="goods_security address_left" v-if="initData.poi_service">
                    <img src="./img/server.png" alt="">
                    <span>商家服务</span>
                    <img :src="initData.poi_service[0].icon" alt="" class="server">
                    <span>{{initData.poi_service[0].content}}</span>
                </div>
                <!-- 优惠 -->
                <div class="goods_security address_left" v-if="initData.discounts2">
                    <img :src="initData.discounts2[0].icon_url" alt="">
                    <span>{{initData.discounts2[0].info}}</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Split from "../split/Split";
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      initData: {}, //数据初始化
      pic: {} //照片
    };
  },
  created() {
    init: {
      this.$axios.get("/api/seller").then(data => {
        let Data = data.data.data;
        this.initData = Data;
        this.pic = this.initData.poi_env.thumbnails_url_list;
        this.$nextTick(() => {
          const options = {
            scrollX: true
          };
          this.pic_list = new Bscroll(this.$refs.pic_list, options);
          console.log(this.pic_list);
        });
      });
    }
  },
  components: {
    split: Split
  }
};
</script>

<style scoped>
.seller {
  position: relative;
  top: 40px;
  bottom: 0;
  height: 100vh;
  background: #f4f4f4;
}
.seller_content {
  background: white;
}
.addess_wrap {
  display: flex;
  padding: 10px 0;
  margin: 0 10px;
  justify-content: space-between;
}
.pic_wrap {
  /* width: 200px; */
  overflow: hidden;
}
.pic_list {
  display: flex;
  padding: 0 10px;
}
.pic_list img {
  display: inline-block;
  width: 93px;
  height: 75px;
  margin-right: 10px;
}
.goods_security {
  padding: 10px 0;
  margin: 0 10px;
}
.address_left img {
  display: inline-block;
  width: 14px;
  vertical-align: middle;
}
.address_left span {
  vertical-align: middle;
  margin-left: 5px;
}
.telephone_right {
  padding-left: 20px;
  border-left: 1px solid #eee;
}
.telephone_right img {
  display: inline-block;
  width: 18px;
}
.server {
  margin-left: 15px;
}
</style>