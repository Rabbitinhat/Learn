//NOTE 排序算法

function ArrayList(){
    var array = [];

    this.insert = function(item){
        array.push(item);
    };

    this.toString = function(){
        return array.join();
    };
    
    var swap = function(array, index1, index2){
        let aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    }
    //NOTE 实现冒泡排序
    this.bubbleSort = function(){
        var length = array.length;
        for(let i=0; i<length; i++){
            for(let j=0; j<length-1; j++){
                if(array[j]>array[j+1]){
                    swap(array, j, j+1);
                }
            }
        }
    }

    //NOTE 改进的冒泡排序
    this.modifiedBubbleSort = function(){
        var length = array.length;
        for(let i=0; i<length; i++){
            //NOTE 减去已循环好的元素(外层循环跑过的轮数)
            for(var j=0; j<length-1-i; j++){
                if(array[j] > array[j+1]){
                    swap(array, j, j+1);
                }
            }
        }
    }

    //NOTE 选择排序
    this.selectionSort = function(){
        let length = array.length;
        let indexMin;

        for(var i=0; i<length-1; i++){
            indexMin = i;
            for(var j=i; j<length; j++){
                //NOTE 找到最小值
                
                if(array[indexMin] > array[j]){
                    indexMin = j;
                }
            }
            //NOTE 如果当前位置不是最小值
            if(i !== indexMin){
                swap(array, i, indexMin);
            }
        }
    }

    //NOTE 插入排序
    this.insertionSort = function(){
        let length = array.length;
        let j;
        let temp;

        for(var i=1; i<length; i++){
            //NOTE 当前位置(带插入位置)
            j = i;
            temp = array[i];
            //NOTE 如果前一值大于当前值
            while(j>0 && array[j-1] > temp){
                //NOTE 当前值等于前一值
                array[j] = array[j-1];
                //NOTE 索引前移至最小值
                j--;
            }
            //NOTE 当前值为最小值
            array[j] = temp;
        }
    }

    //NOTE 归并排序实际执行的辅助函数
    let mergeSortRec = function(array){
        let length = array.length;
        //NOTE 数组长度为1时, 停止递归
        if(length === 1){
            return array;
        }

        //NOTE 二分数组
        let mid = Math.floor(length / 2);
        let left = array.slice(0, mid);
        let right = array.slice(mid, length);

        //NOTE 调用merge()
        return merge(mergeSortRec(left), mergeSortRec(right));
    }
    let merge = function(left, right){
        let result = [];
        let il = 0;
        let ir = 0;

        while(il < left.length && ir < right.length){
            if(left[il] < right[ir]){
                result.push(left[il++]);
            }else{
                result.push(right[ir++]);
            }
        }
        while(il < left.length){
            result.push(left[il++]);
        }
        while(ir < right.length){
            result.push(right[ir++]);
        }

        return result;
    };
    //NOTE 归并排序
    this.mergeSort = function(){
        array = mergeSortRec(array);
    };

    //NOTE 快速排序
    //NOTE 划分数组
    let partition = function(array, left, right){
        //NOTE 选择中间项作为主元
        let pivot = array[Math.floor((right+left) / 2)];
        //NOTE 初始化两个指针
        let i = left;
        let j = right;

        //NOTE left指针不大于right指针
        while(i <= j){
            //NOTE 移动左指针直到找到比主元大的值
            while(array[i] < pivot){
                i++;
            }
            //NOTE 移动右指针直到找到比主元小的值
            while(array[j] > pivot){
                j--;
            }
            //NOTE 左指针不大于右指针
            if(i <= j){
                //NOTE 交换两个元素,是左边元素比主元小,右边元素比主元大
                swap(array, i, j);
                //NOTE 继续移动指针
                i++;
                j--;
            }
        }
        //NOTE 返回左指针的索引
        return i;
    }
    let quick = function(array, left, right){
        let index;
        
        //NOTE 数组长度比1大
        if(array.length > 1){
            //NOTE 调用partition得到index
            index = partition(array, left, right);

            //NOTE 子数组存在较小值的元素
            if(left < index-1){
                quick(array, left, index-1);
            }
            //NOTE 子数组存在较大值的元素
            if(index < right){
                quick(array, index, right);
            }
        }
    };
    //NOTE 调用辅助递归函数(待排序数组, 索引0, 数组尾部)
    this.quickSort = function(){
        quick(array, 0, array.length - 1);
    }

    //NOTE 堆排序
    let heapify = function(array, heapSize, i){
        let left = i * 2 + 1;
        let right = i * 2 + 2;
        let largest = i;

        if(left < heapSize && array[left] > array[largest]){
            largest = left;
        }
        if(right < heapSize && array[right] > array[largest]){
            largest = right;
        }
        if(largest !== i){
            swap(array, i, largest);
            heapify(array, heapSize, largest);
        }
    }
    let buildHeap = function(array){
        let heapSize = array.length;
        for(let i=Math.floor(array.length / 2); i >= 0; i--){
            heapify(array, heapSize, i);
        }
    };
    this.heapSort = function(){
        let heapSize = array.length;
        //NOTE 构造一个满足array[parent(i)] >= array[i] (父元素值大于子元素)的堆结构
        buildHeap(array);

        while(heapSize > 1){
            heapSize--;
            //NOTE 交换堆中第一元素(数组中较大的值)和最后一个元素
            swap(array, 0, heapSize);
            //NOTE 再次将数组转换成堆,找到当前堆的根节点(交换后较小的值),重新放到树的底部
            heapify(array, heapSize, 0);
        }
    };

    //NOTE 搜素算法
    //NOTE 顺序搜素
    this.sequentialSearch = function(item){
        for(let i=0; i<array.length; i++){
            if(item === array[i])
                return i;
        }
        return -1;
    };

    //NOTE 二分查找
    this.binarySearch = function(item){
        //NOTE 对数组进行排序
        this.quickSort();

        let low = 0;
        let high = array.length - 1;
        let mid;
        let element;

        while(low <= high){
            mid = Math.floor((low + high) / 2);
            element = array[mid];
            if(element < item){
                low = mid + 1;
            }else if(element > item){
                high = mid - 1;
            }else{
                return mid;
            }
        }

        return -1;
    };
    
};


function createNonSortedArray(size){
    var array = new ArrayList();
    for(let i=size; i>0; i--){
        array.insert(Math.floor(Math.random() * 101));
    }
    return array;
}

var array = createNonSortedArray(10);
console.log(array.toString());
array.bubbleSort();
console.log(array.toString());

array = createNonSortedArray(10);
console.log(array.toString());
array.selectionSort();
console.log(array.toString());

array = createNonSortedArray(10);
console.log(array.toString());
array.insertionSort();
console.log(array.toString());

array = createNonSortedArray(10);
console.log(array.toString());
array.quickSort();
console.log(array.toString());