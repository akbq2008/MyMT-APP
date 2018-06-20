<template>
  <div id="app">
    <page-nav></page-nav>
    <div class="router_wrap">
      <router-link to="/goods">点菜
        <i class="bottom_line"></i>
      </router-link>
      <router-link to="/ratings">评价({{initData.comment_num}})
        <i class="bottom_line"></i>
      </router-link>
      <router-link to="/seller">商家
        <i class="bottom_line"></i>
      </router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/nav/Nav";
export default {
  name: "App",
  data() {
    return {
      initData: {} //数据初始化
    };
  },
  components: {
    "page-nav": Nav
  },
  created() {
    getComment: {
      this.$axios
        .get("/api/seller")
        .then(data => {
          const result = data.data.data;
          // console.log(result);
          this.initData = result;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.router_wrap {
  display: flex;
  position: relative;
  top: 40px;
  text-align: center;
  border-bottom: 1px solid #e4e4e4;
}
.router_wrap a {
  position: relative;
  flex: 1;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-family: "微软雅黑";
  color: #666;
}
.router_wrap .active {
  color: #ffbb22;
}
.router_wrap .active .bottom_line {
  display: inline-block;
  width: 20px;
  height: 2px;
  background: #ffbb22;
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -10px;
}
</style>
