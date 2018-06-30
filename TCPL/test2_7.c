/*
 * @Author: chyon71 
 * @Date: 2018-07-01 01:11:19 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-01 01:13:22
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
int invert(int x, int p, int n){
    int result = x ^ ~(~(~0 << n) << (p + 1 - n));
    return result;
}