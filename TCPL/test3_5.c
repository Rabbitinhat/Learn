/*
 * @Author: chyon71 
 * @Date: 2018-07-09 23:32:42 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-09 23:47:55
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
#define abs(x)  ((x) < 0? -(x) : (x))
void itob(int n, char s[],int b){
    int i, c, sign;
    void reverse(char s[]);

    sign = n;
    i = 0;
    do{
        (c = abs(n % b)) <= 9 ? s[i++] = c + '0' : s[i++] = c - 10 + 'A';
    }while((n /= b) != 0);
    if(sign < 0) s[i++] = '-';
    s[i] = '\0';
    reverse(s[i]);
}