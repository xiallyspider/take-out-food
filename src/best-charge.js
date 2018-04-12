function bestCharge(selectedItems) {
  let result = `============= 订餐明细 =============<br/>`
  let sum = 0
  for(let x = 0; x < selectedItems.length; x++){
    result += selectedItems[x] +  ` = ` + countCost(selectedItems[x]) + `元<br/>`
    sum += countCost(selectedItems[x])
  }
  result += `-----------------------------------
             使用优惠:<br/>` 
  for(let y = 0; y < selectedItems.length; y++){
    result += promotions(selectedItems[y])
  }
  result += `-----------------------------------
  总计：` + sum `元
  ===================================`
  
  return result;
}
function countCost(selection){
  let count = 0
  let items = loadAllItems()
  let tempArr = selection.split(" x ")
  for(let i = 0; i < items.length; i++){
    if(items[i].id === tempArr[0]){
      count = items.price * parseInt(tempArr[1])
    }
  }
  return count
}
function promotions(selection){
  let promotionsResult = ''
  return promotionsResult
}
