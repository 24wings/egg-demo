import { EggApplication } from 'egg';


let bwsAdminApi = {
  productGroup: {
    list: "/bangwei-shop/admin/list-product-groups",
    create: "/bangwei-shop/admin/create-product-group",
    update: "/bangwei-shop/admin/update-product-group",
    delete: "/bangwei-shop/admin/delete-product-group"
  },
  product: {
    list: "/bangwei-shop/admin/list-products",
    search: "/bangwei-shop/admin/search-product",
    create: "/bangwei-shop/admin/create-product",
    delete: "/bangwei-shop/admin/delete-product",
    update: "/bangwei-shop/admin/update-product",
    active: "/bangwei-shop/admin/active-product",
    unactive: "/bangwei-shop/admin/unactive-product"
  },
  reduction: {
    list: "/bangwei-shop/admin/list-reductions",
    create: "/bangwei-shop/admin/create-reduction",
    update: "/bangwei-shop/admin/update-reduction",
    delete: "/bangwei-shop/admin/delete-reduction"
  },
  user: {
    list: "/bangwei-shop/admin/list-users",
    create: "/bangwei-shop/admin/create-user",
    update: "/bangwei-shop/admin/update-user",
    delete: "/bangwei-shop/admin/delete-user"
  },
  queryOrder: '/bangwei-shop/admin/query-order',
  getOrderInfo: '/bangwei-shop/admin/getOrderInfo',// orderId
  sendProduct: '/bangwei-shop/admin/send-product', // post:  orderId  transfer? reciveAddress 
};

module.exports = (app: EggApplication) => {

  bwsAdminRouter
    //邦为管理后台
    .get(bwsAdminApi.productGroup.list, bwsAdminCtrl.porductGroupList) // 产品组
    .post(bwsAdminApi.productGroup.create, bwsAdminCtrl.createProductGroup)
    .put(bwsAdminApi.productGroup.update, bwsAdminCtrl.productGroupUpdate)
    .del(bwsAdminApi.productGroup.delete, bwsAdminCtrl.productGroupDelete)

    .get(bwsAdminApi.product.list, bwsAdminCtrl.productList) // 产品
    .post(bwsAdminApi.product.create, bwsAdminCtrl.productCreate)
    .put(bwsAdminApi.product.update, bwsAdminCtrl.productUpdate)
    .put(bwsAdminApi.product.unactive, bwsAdminCtrl.productUnactive)
    .put(bwsAdminApi.product.active, bwsAdminCtrl.productUnactive)
    .del(bwsAdminApi.product.delete, bwsAdminCtrl.productDelete)
    .get(bwsAdminApi.reduction.list, bwsAdminCtrl.listReduction) // 消费减免
    .post(bwsAdminApi.reduction.create, bwsAdminCtrl.createReduction)
    .put(bwsAdminApi.reduction.update, bwsAdminCtrl.updateReduction)
    .del(bwsAdminApi.reduction.delete, bwsAdminCtrl.delelteReduction)
    .get(bwsAdminApi.user.list, bwsAdminCtrl.listUsers)
    .post(bwsAdminApi.user.create, bwsAdminCtrl.createUser)
    .put(bwsAdminApi.user.update, bwsAdminCtrl.updateUser)
    .del(bwsAdminApi.user.delete, bwsAdminCtrl.deleteUser)
    .get(bwsAdminApi.queryOrder, bwsAdminCtrl.queryOrders)
    .get(bwsAdminApi.getOrderInfo, bwsAdminCtrl.getOrderInfo)
    .post(bwsAdminApi.sendProduct, bwsAdminCtrl.sendProduct)

}