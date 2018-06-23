import Vue from "vue";
import Router from "vue-router";
// 一级路由
import Goods from "@/components/goods/Goods";
import Seller from "@/components/seller/Seller";
import Ratings from "@/components/ratings/Ratings";
//二级路由
import ProductDetail from "@/components/productDetail/ProductDetail";
Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      redirect: "/goods",
      component: Goods
    },
    {
      path: "/goods",
      name: "goods",
      component: Goods,
      children: [
        {
          path: "detail",
          name: "detail",
          component: ProductDetail
        }
      ]
    },
    {
      path: "/seller",
      name: "seller",
      component: Seller
    },
    {
      path: "/ratings",
      name: "ratings",
      component: Ratings
    }
  ]
});
