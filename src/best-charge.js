'use strict';

var loadPromotions = require('./promotions.js');
var loadAllItems = require('./items.js');
function bestCharge(selectedItems) {
  let result = `============= 订餐明细 =============
`
  var sum = 0
  for(let x = 0; x < selectedItems.length; x++){
  let arr = selectedItems[x].split(" x ")
  let selectedItem = getName(arr[0]) + ' x ' + arr[1]
  result += selectedItem +  ` = ` + parseInt(countCost(selectedItems[x])) + `元
`
  sum += countCost(selectedItems[x])
  }
  
  // 不同优惠方式的优惠价格
  let promotionPrices = []
  let promotions = loadPromotions()
  
  var upCut = upCutPromotion(promotions[0], sum)
  var halfPrice = halfPricePromotion(promotions[1], selectedItems)
  
  if(upCut != null){
    promotionPrices.push(upCut)
  }
  if(halfPrice != null){
    promotionPrices.push(halfPrice)
  }
  
  // 选出最佳优惠方式
  var bestChargePrice = 0
  if(promotionPrices.length > 0){
    let bestChargeItem = {}
    for(let z = 0; z < promotionPrices.length; z++){
      if(promotionPrices[z].price > bestChargePrice){
        bestChargePrice = promotionPrices[z].price
        bestChargeItem = promotionPrices[z]
      }
    }
  result += `-----------------------------------
使用优惠:
` 
  result += bestChargeItem.type + `，省` + bestChargeItem.price + `元
`
  }
  var cut = (sum - bestChargePrice)
  result += `-----------------------------------
`
  result +=`总计：`+ cut +`元
===================================`
  return result;
}
// 输入菜品和数量，返回当前价格
function countCost(selection){
  let count = 0
  let items = loadAllItems()
  let tempArr = []
  if( typeof selection != "object"){
    tempArr = selection.split(" x ")
  } else {
    tempArr = selection
  }
  for(let i = 0; i < items.length; i++){
    if(items[i].id === tempArr[0]){
      count = items[i].price * parseInt(tempArr[1])
    }
  }
  return count
}
// 满30减6优惠价格 输入原价总价
function upCutPromotion(type,sum){
  let result = {}
  if(sum >= 30){
    result = {type: type.type, price: 6}
  } else {
    result = null
  }
  return result
}
// 半价优惠价格 输入菜品
function halfPricePromotion(type,selectedItems){
  let result = {}
  let items = []
  let promotionsPrice = 0
  let halfPriceItems = type.items
  for(let x = 0; x < selectedItems.length; x++){
    let tempArr = selectedItems[x].split(" x ")
    for (let i = 0; i < halfPriceItems.length; i++){
      if(tempArr[0] === halfPriceItems[i]){
        let promotion = countCost(tempArr)/2
        let item = getName(halfPriceItems[i])
        items.push(item)
        promotionsPrice += promotion
      }
    }
  }
  if (items.length != 0) {
    let tempStr = items[0]
    for (let y = 1; y < items.length; y++){
      tempStr +='，'+items[y]
    }
    result = {
      type: type.type + '('+ tempStr + ')',
      price: promotionsPrice
    }
  } else {
    result = null
  }
  return result
}
// 输入菜品ID,返回名称
function getName(item){
  let name = ''
  let items = loadAllItems()
  for(let i = 0; i < items.length; i++){
    if(items[i].id === item){
      name = items[i].name
    }
  }
  return name
}
module.exports = bestCharge;