/*
 * @Author: chyon71 
 * @Date: 2018-07-01 00:34:03 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-01 01:09:33
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
int setbits(int x, int p, int n, int y){
    int num1 = (~(~0 << n) & y) << (p - n + 1);
    int num2 = x & ((~0 << p) | ~(~0 << (p - n + 1)));
    int result = num1 | num2;
    return result;
}
//Answer
/* setbits: set n bits of x at position p with bits of y */
unsigned setbits(unsigned x, int p, int n, unsigned y){
    return x & ~(~(~0 << n) << (p + 1 - n)) | (y & ~(~0 << n)) << (p + 1 - n);
}