/*
 * @Author: chyon71 
 * @Date: 2018-07-09 23:27:41 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-09 23:31:32
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
//Answer

#define abx(x)  ((x) < 0 ? -(x) : (x))
/* itoa: convert n to charactres in s - modified */
void itoa(int n, char s[]){
    int i, sign;
    void reverse(char s[]);

    sign = n;
    i = 0;
    do{
        s[i++] = abs(n % 10) + '0';
    }while((n /= 10) != 0);

    if(sign < 0)
        s[i++] = '-';
    s[i] = '\0';
    reverse(s[i]);
}