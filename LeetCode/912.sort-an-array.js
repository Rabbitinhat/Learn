/*
 * @lc app=leetcode id=912 lang=javascript
 *
 * [912] Sort an Array
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  // * 每遍历一次数组, 找出最大值; 剩余项继续排列, j为每次遍历终点之后的位置, 并随着每次遍历逐步减少
  for(let j=nums.length-1; j>0; j--){
    let sign = 0
    // * 找出相邻两项的最大值, 遍历一边数组后, 数组中的最大项移动到末尾
    for(let i=0;i < j; i++){
      if(nums[i] > nums[i+1]){
        swap(nums, i, i+1)
        sign = 1
      }
    }
    if(!sign){
      break
    }
  }
  return nums
};

// * 交换数组指定的两项
function swap(ary, i, j){
  ary[i] = ary[i] + ary[j]
  ary[j] = ary[i] - ary[j]
  ary[i] = ary[i] - ary[j]
}

