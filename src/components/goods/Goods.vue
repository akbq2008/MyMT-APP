<template>
  <div>
    <div class="goods_wrap">
      <!-- 左侧菜单 -->
      <div class="goods_menu" ref="goods_menu">
        <ul>
          <!-- 专场 -->
          <li @click="selectIndex(0)" class="menu" v-if="initData.container_operation_source" :class="{'current':currentIndex===0}">
            <img class="icon" v-if="initData.container_operation_source.tag_name" :src="initData.container_operation_source.tag_icon" alt="hot"> {{initData.container_operation_source.tag_name}}
          </li>
          <li @click="selectIndex(index+1)" class="menu" v-for="(item,index) in initData.food_spu_tags" :key="index" :class="{'current':currentIndex===index+1}">
            <!-- 如果有icon的话就显示 -->
            <img class="icon" v-if="item.icon" :src="item.icon" alt="hot">{{item.name}}
          </li>
        </ul>
      </div>
      <!-- 菜单具体内容 -->
      <div class="goods_content" ref="goods_content">
        <!-- 专场 -->
        <ul>
          <li class="special_field goods" v-if="initData.container_operation_source">
            <img v-for="(item,index) in initData.container_operation_source.operation_source_list" :key="index" :src="item.pic_url" alt="">
          </li>
          <!-- 具体的商品信息 -->
          <li class="goods" v-for="(item,index) in goods" :key="index">
            <h3 class="goods_title">{{item.name}}</h3>
            <!-- 商品detail -->
            <ul class="goods_box">
              <li class="goods_item" v-for="(goods,index) in item.spus" :key="index">
                <img class="goods_pic" :src="goods.picture" alt="pic">
                <div class="goods_detail">
                  <h3>{{goods.name}}</h3>
                  <p class="goods_sell">
                    <span>{{goods.month_saled_content}}</span>
                    <span>{{goods.praise_content}}</span>
                  </p>
                  <p>
                    <span class="goods_price">￥{{goods.min_price}}</span>
                    <span class="goods_unit">/{{goods.unit}}</span>
                  </p>
                </div>
                <div class="cart_add ">
                  <app-add :goods="goods"></app-add>
                </div>
                <!-- 商品增删 -->
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="shop_cart">
      <shop-cart :poi_info="poi_info" :selectFood="selectFood"></shop-cart>
    </div>
  </div>
</template>

<script>
import CartControl from "../cartControl/CartControl";
import ShopCart from "../shopCart/ShopCart";
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      initData: {}, //数据初始化
      goods: [],
      goods_content: {}, //右侧商品内容滚动
      poi_info: {}, //餐厅信息
      listHeight: [],
      scrollY: 0 //当前的滚动高度
    };
  },
  components: {
    "app-add": CartControl,
    "shop-cart": ShopCart
  },
  created() {
    getMenu: {
      this.$axios.get("/api/goods").then(data => {
        const result = data.data.data;
        this.initData = result;
        this.goods = this.initData.food_spu_tags;
        // console.log(this.goods);
        this.poi_info = this.initData.poi_info;
        const options = {
          scrollY: true, //
          probeType: 3
        };
        this.goods_menu = new Bscroll(this.$refs.goods_menu); //左侧菜单滚动
        this.goods_content = new Bscroll(this.$refs.goods_content, options); //右侧商品内容滚动
        this.$nextTick(() => {
          //计算分类的区间高度
          this.initScroll();
          this.calculate();
          //监听滚动的位置
          //根据滚动位置确认下标，与左侧对应。
          //通过下标实现点击左侧，滚动右侧
        });
      });
    }
  },
  computed: {
    currentIndex: {
      get() {
        const leng = this.listHeight.length;
        for (var i = 0; i < leng; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          // !height2可以剞劂数组越界
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      set() {}
    },
    //当值发生改变时才会监听
    selectFood() {
      let shoppingCar = [];
      this.goods.forEach(element => {
        element.spus.forEach(items => {
          if (items.count > 0) {
            shoppingCar.push(items);
          }
        });
      });
      return shoppingCar;
    }
  },
  methods: {
    //点击跳转到具体的位置
    selectIndex(index) {
      this.currentIndex = index;
      this.goods_content.scrollToElement(
        document.querySelectorAll(".goods")[index],
        250
      );
    },
    // 监听滚动
    initScroll() {
      this.goods_content.on("scroll", pos => {
        let y = pos.y;
        this.scrollY = Math.abs(Math.round(y));
      });
    },
    calculate() {
      //获取元素
      let goods = document.querySelectorAll(".goods");
      let height = 0;
      this.listHeight.push(height);
      let leng = goods.length;
      for (let i = 0; i < leng; i++) {
        let item = goods[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  }
};
</script>

<style scoped>
.goods_wrap {
  display: flex;
  position: absolute;
  top: 190px;
  bottom: 51px;
  overflow: hidden;
  width: 100%;
}
.goods_menu {
  /*不要动，固定为85px*/
  flex: 0 0 85px;
  background: #f4f4f4;
}
.goods_content {
  flex: 1;
}
.menu {
  padding: 16px 10px;
  border-bottom: 1px solid #e4e4e4;
}
.icon {
  display: inline-block;
  width: 15px;
}
.special_field {
  height: 174px;
  padding: 10px 10px 0 10px;
  border-bottom: 1px solid #e4e4e4;
}
.special_field img {
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
}
/*商品的具体信息*/
.goods_pic {
  padding: 0 5px;
  sdisplay: inline-block;
  width: 70px;
  height: 75px;
}
/*商品具体信息*/
.goods_detail {
  display: inline-block;
}
.goods_detail h3 {
  font-size: 15px;
  font-family: "微软雅黑";
  color: #333333;
  max-width: 150px;
}
.goods_box {
  position: relative;
}
.goods_detail {
  height: 70px;
}
.goods_sell {
  color: #bfbfbf;
  margin: 10px 0;
}
.goods_sell span {
  margin-right: 10px;
}
.goods_price {
  color: #fb4e44;
  font-size: 14px;
}
.goods_unit {
  color: #bfbfbf;
}
.goods_title {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 13px;
  padding-left: 7px;
  background: url("img/btn_yellow_highlighted@2x.png") no-repeat left;
  background-size: 2px 10px;
}
.goods_item {
  position: relative;
  margin-bottom: 10px;
}
/*商品增加*/
.cart_add {
  position: absolute;
  right: 10px;
  bottom: 0;
}
/* 购物车 */
.shop_cart {
  position: fixed;
  background: #1313137a;
  height: 51px;
  left: 0;
  right: 0;
  bottom: 0px;
}
.current {
  background: #fff;
}
</style>