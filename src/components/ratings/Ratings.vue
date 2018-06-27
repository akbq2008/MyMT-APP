<template>
  <div ref="comment_list_wrap" class="ratings_wrap">
    <div class="ratings">
      <!-- 评分 -->
      <div class="star">
        <div class="star_left">
          <div class="seller_star">
            <p class="comments_score">{{init.comment_score}}</p>
            <p>商家评分</p>
          </div>
          <div class="seller_score">
            <div>
              <span>口味</span>
              <star :score="init.quality_score"></star>
              {{init.quality_score}}
            </div>
            <div>
              <span>包装</span>
              <star :score="init.pack_score"></star>
              {{init.pack_score}}
            </div>
          </div>
        </div>
        <div class="star_right">
          <p class="delivery_score">{{init.delivery_score}}</p>
          <p>配送评分</p>
        </div>
      </div>
      <!-- 评分 -->
      <!-- 分割线 -->
      <split></split>
      <!-- tab -->
      <div class="tab_checkbox_wrap">
        <div class="tab_checkbox">
          <span :class="{'active':selectType==2}" @click="select(2)">全部</span>
          <span :class="{'active':selectType==1}" @click="select(1)">有图</span>
          <span :class="{'active':selectType==0}" @click="select(0)" class="tab_comment">
            <img v-if="selectType!=0" src="./img/icon_sub_tab_dp_normal@2x.png" alt="">
            <img v-else src="./img/icon_sub_tab_dp_highlighted@2x.png" alt=""> 点评(3.5分)
          </span>
        </div>
      </div>
      <!-- tab -->
      <!-- label -->
      <div class="label">
        <span v-for="(item,index) in label" :key="index">
          {{item.content}} {{item.label_count}}
        </span>
      </div>
      <!-- label -->
      <!-- comment -->
      <div>
        <div class="comment_list" v-for="(item,index) in selectComments" :key="index" v-if="selectComments.length!=0">
          <div class="comment_list_left">
            <img v-if="item.user_pic_url" :src="item.user_pic_url" alt="">
            <img v-else src="./img/anonymity.png" alt="">
          </div>
          <div class="comment_list_right">
            <div class="comment_list_right_wrap">
              <span class="user_name">{{item.user_name}}</span>
              <span class="order_time">{{formatDate(item.order_time)}}</span>
            </div>
            <div class="comment_score">
              <span>评分</span>
              <star :score="item.order_comment_score"></star>
            </div>
            <p>{{item.comment}}</p>
          </div>
        </div>
        <div v-else>
          暂无内容
        </div>
      </div>
      <!-- comment -->
    </div>
  </div>
</template>

<script>
const ALL = 2;
const PICTURE = 1;
const COMMENT = 0;
import Split from "../split/Split";
import Star from "../star/Star";
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      init: {}, //初始化数据
      selectType: 2, //默认选中全部
      label: {}, //标签数据
      comments: {} //评论
    };
  },
  components: {
    split: Split,
    star: Star
  },
  created() {
    // 初始化函数
    init: {
      this.$axios.get("/api/ratings").then(data => {
        this.init = data.data.data;
        this.label = this.init.labels; //标签
        this.comments = this.init.comments;
        this.$nextTick(() => {
          const options = {
            minScrollY: 0
          };
          this.comment_list_wrap = new Bscroll(
            this.$refs.comment_list_wrap,
            options
          );
          // console.log(this.comment_list_wrap);
        });
      });
    }
  },
  computed: {
    // 根据类型来筛选数据
    selectComments() {
      if (this.selectType == ALL) {
        return this.init.comments;
      } else if (this.selectType == PICTURE) {
        let arr = [];
        this.init.comments.forEach(item => {
          if (item.comment_pics.length > 0) {
            arr.push(item);
          }
        });
        return arr;
      } else {
        return this.init.comments_dp.comments;
      }
    }
  },
  methods: {
    select(type) {
      this.selectType = type;
    },
    // 时间格式化
    formatDate(time) {
      let date = new Date(time * 1000);
      let fmt = "yyyy.MM.dd";
      if (/(y+)/.test(fmt)) {
        // 年
        let year = date.getFullYear().toString();
        fmt = fmt.replace(RegExp.$1, year);
      }
      if (/(M+)/.test(fmt)) {
        // 月
        let mouth = date.getMonth() + 1;
        if (mouth < 10) {
          mouth = "0" + mouth;
        }
        fmt = fmt.replace(RegExp.$1, mouth);
      }
      if (/(d+)/.test(fmt)) {
        // 日
        let mydate = date.getDate();
        if (mydate < 10) {
          mydate = "0" + mydate;
        }
        fmt = fmt.replace(RegExp.$1, mydate);
      }
      return fmt;
    }
  }
};
</script>

<style scoped>
.ratings {
  position: relative;
}
.star {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  align-items: center;
}
.star_left {
  display: flex;
  align-items: center;
}
.comments_score {
  font-size: 23px;
  font-weight: 800;
  color: #ffd161;
  margin-bottom: 9px;
}

.seller_star p:last-of-type {
  font-size: 11px;
  color: #666666;
}
.seller_score {
  margin-left: 20px;
}
.seller_score span {
  display: inline-block;
  padding: 5px 0;
  font-size: 11px;
  color: #666666;
}
.delivery_score {
  font-size: 19px;
  font-weight: 600;
  color: #999999;
  margin-bottom: 14px;
  margin-top: 3px;
}
.star_right {
  padding-left: 30px;
  border-left: 1px solid #9d9d9d;
}
.star_right p:last-of-type {
  font-size: 11px;
  color: #999999;
}
/* 选项卡 */
.tab_checkbox_wrap {
  padding: 10px;
}
.tab_checkbox {
  display: flex;
  text-align: center;
  font-weight: 600;
  border: 1px solid #ffd161;
  border-right: 0;
  border-radius: 5px;
}
.tab_checkbox span {
  flex: 1;
  padding: 10px 0;
  font-size: 15px;
  color: #ffd161;
}
.tab_checkbox span {
  border-right: 1px solid #ffd161;
}
.tab_comment img {
  display: inline-block;
  width: 13px;
  vertical-align: middle;
}
span.active {
  background: #ffd161;
  color: black;
}
.label {
  margin: 0 10px;
}
.label span {
  display: inline-block;
  background: #f4f4f4;
  border-radius: 5px;
  padding: 5px;
  color: #999999;
  margin-right: 5px;
  margin-bottom: 5px;
}
/* 评论 */
.comment_list {
  display: flex;
  margin: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #bfbfbf;
}
.comment_list_left {
  flex: 0 0 45px;
}
.comment_list_left img {
  display: inline-block;
  width: 35px;
  border-radius: 17px;
}
.comment_list_right {
  flex: 1;
}
.comment_list_right_wrap {
  display: flex;
  justify-content: space-between;
}
.user_name {
  font-size: 11px;
  color: #333;
}
.order_time {
  color: #999;
}
.comment_score span {
  color: #999;
}
.ratings_wrap {
  position: absolute;
  top: 190px;
  bottom: 0;
  /* height: 70vh; */
  overflow: hidden;
}
</style>