<template>
    <div class="detail_wrap">
        <!-- 商品区域 -->
        <div class="detail_goods">
            <!-- 详细商品头部 -->
            <div class="detail_head">
                <div class="detail_head_left">
                    <svg class="icon" @click="detail_close" aria-hidden="true" width="32px" height="32px">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
                <div class="detail_head_right">
                    <svg class="icon" aria-hidden="true" width="32px" height="32px">
                        <use xlink:href="#icon-share"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" width="32px" height="32px">
                        <use xlink:href="#icon-more"></use>
                    </svg>
                </div>
            </div>
            <!-- 详细商品头部 -->
            <div ref="detail_content" class="detail_content_wrap">
                <div>
                    <!-- 商品展示栏 -->
                    <div class="detail_content" v-for="(item,index) in initData" :key="index">
                        <img :src="item.picture" alt="">
                        <h3>{{item.name}}</h3>
                        <p>{{item.month_saled_content}}</p>
                        <img class="hot_goods" v-show="item.product_label_picture" :src="item.product_label_picture" alt="">
                        <div class="detail_select">
                            <div class="left">
                                ￥{{item.min_price}}
                            </div>
                            <div class="right" :class="{'right_color':!item.count}">
                                <span v-show="!item.count" @click="putCart(item)">+ 加入购物车</span>
                                <app-cartControl v-show="item.count" :items="item"></app-cartControl>
                            </div>
                        </div>
                    </div>
                    <!-- 商品展示栏 -->
                    <!--评价区域  -->
                    <div class="evaluation" v-for="(item,index) in initData" :key="index.id">
                        <!-- 商品描述 -->
                        <div class="detail_description">
                            <h3 v-show="item.description">商品描述</h3>
                            <p v-show="item.description">{{item.description}}</p>
                        </div>
                        <!-- 商品描述 -->
                        <!-- 外卖评价 -->
                        <div class="takeout_evaluation">
                            <div class="evaluation_left">
                                <h3>{{item.rating.title}}</h3>
                                <span>({{item.rating.like_ratio_desc}}</span>
                                <span class="like_ratio">{{item.rating.like_ratio}})</span>
                            </div>
                            <div class="evaluation_right">
                                <span>{{item.rating.snd_title}}</span>
                                <svg class="icon" aria-hidden="true" width="13px" height="13px" fill="#bfbfbf" v-show="item.rating.snd_title!='暂无'">
                                    <use xlink:href="#icon-xiangqian"></use>
                                </svg>
                            </div>
                        </div>
                        <!-- 评论 -->
                        <ul>
                            <li v-for="(comment,index) in item.rating.comment_list" :key="index" class="user_comment_wrap">
                                <div class="user_pic">
                                    <img v-if="comment.user_icon" :src="comment.user_icon" alt="">
                                    <img v-else src="./img/anonymity.png" alt=" ">
                                </div>
                                <div class="user_comment ">
                                    <div class="user_comment_header ">
                                        <div class="user_name ">{{comment.user_name}}</div>
                                        <div class="user_time ">{{comment.comment_time}}</div>
                                    </div>
                                    <div class="user_comment_content ">{{comment.comment_content}}</div>
                                </div>
                            </li>
                        </ul>
                        <!-- 评论 -->
                        <!-- 外卖评价 -->
                        <!--评价区域  -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bscroll from "better-scroll";
import CartControl from "../cartControl/CartControl";
import Vue from "vue";
export default {
  props: {
    items: {
      type: Array
    }
  },
  data() {
    return {
      //   key: value
      initData: [] //初始数据
    };
  },
  watch: {
    initData() {
      if (this.initData) {
        this.$nextTick(() => {
          this.detail_content = new Bscroll(this.$refs.detail_content);
          //   console.log(this.detail_content);
        });
      }
    }
  },
  created() {
    init: {
      if (this.items.length != 0) {
        this.initData = this.items;
      } else {
        //   如果当前没有点击数据就直接刷新页面的话，就直接强制刷新页面，防止报错。
        location.reload();
        this.$router.push("/goods");
      }
    }
  },
  methods: {
    //关闭商品明细
    detail_close() {
      this.$router.go(-1);
    },
    // 加入购物车
    putCart(item) {
      //   item.count = 1;数据不是响应式的
      Vue.set(item, "count", 1); //数据添加是响应式的
    }
  },
  components: {
    "app-cartControl": CartControl
  }
};
</script>

<style scoped>
.detail_wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  background: white;
  padding: 0 10px;
  overflow: hidden;
}
/* 商品明细头部 */
.detail_goods {
  position: relative;
  z-index: 0;
}
div.detail_head {
  position: fixed;
  left: 10px;
  right: 10px;
  padding-top: 20px;
  display: flex;
  z-index: 110;
  align-items: center;
  box-sizing: border-box;
  background: #fff;
}
.detail_head svg {
  width: 22px;
  height: 22px;
}
.detail_head_left {
  flex: 3;
}
.detail_head_right {
  text-align: right;
  flex: 1;
}
/* 商品明细头部 */
/* 商品明细内容 */
.detail_content img:first-of-type {
  display: inline-block;
  width: 100%;
  margin-top: 42px;
}
.hot_goods {
  display: inline-block;
  width: 50px;
  margin-bottom: 5px;
  height: 15px;
}
.detail_content {
  position: relative;
  z-index: 1;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}
.detail_content h3 {
  font-family: "微软雅黑";
  font-size: 16px;
  color: #333333;
  font-weight: bold;
}
.detail_select {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.detail_content p:first-of-type {
  color: #bfbfbf;
  margin: 10px 0;
}
.detail_select {
  margin-top: 10px;
}
.left {
  color: #fb4e44;
  font-size: 18px;
  font-weight: bold;
}
/* 加入购物车 */
.right {
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
  height: 32px;
  box-sizing: border-box;
  border-radius: 15px;
  padding: 0 7px;
}
.right_color {
  background: #ffbb22;
}
/* 商品明细内容 */
/* 外卖评价 */
.evaluation {
  padding-top: 10px;
}
.takeout_evaluation {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
  margin-top: 20px;
}
.takeout_evaluation h3,
.detail_description h3 {
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
  font-family: "微软雅黑";
}
.detail_description h3 {
  margin-bottom: 10px;
}
.like_ratio {
  color: #fb4e44;
  font-weight: bold;
}
.evaluation_right span {
  color: #bfbfbf;
}
.evaluation_right span,
.evaluation_right svg {
  vertical-align: middle;
}
/* 评论 */
.user_comment_wrap {
  display: flex;
  padding: 10px 0;
}
.user_comment {
  flex: 1;
}
.user_pic img {
  display: inline-block;
  width: 41px;
  height: 41px;
  border-radius: 20px;
}
.user_pic {
  padding-right: 10px;
}
.user_comment_header {
  color: #bfbfbf;
  margin-bottom: 10px;
  display: flex;
  font-family: "微软雅黑";
  /* word-break: break-all; */
  word-wrap: break-word;
  justify-content: space-between;
}
li.user_comment_wrap {
  border-bottom: 1px solid #ddd;
}
.detail_content_wrap {
  overflow: hidden;
  height: 91vh;
}
/* 外卖评价 */
</style>