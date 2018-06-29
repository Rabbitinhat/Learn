/*
 * @Author: chyon71 
 * @Date: 2018-06-29 17:29:08 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-06-29 17:39:10
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
#include<stdio.h>
#include<ctype.h>

int htosi(char s[]){
    int i = 0 , n = 0;
    if(s[i] ==  '0'){
        i++;
        if(tolower(s[i]) == 'x')
            i++;
    }
    while(i){
        if(isdigit(s[i])){
            n = 16 * n + (s[i] - '0');
        } else if(tolower(s[i]) >= 'a' && s[i] <= 'f'){
            n = 16 * n + 10 + (s[i] - 'a');
        } else {
            printf("input doesn't belong to hex\n");
            break;
        }
        i++;
    }
    return n;

}

//Answer
#define YES 1
#define NO  0

// htoi: convert hexadecimal string s to integer
int htoi(char s[]){
    int hexdigit, i , inhex, n;

    i = 0;
    if(s[i] == '0'){ /* skip optional 0x or 0X */
        ++i;
        if(s[i] == 'x' || s[i] == 'X')
            ++i;
    }
    n = 0; /* integer value to be return */
    inhex = YES; /* assume valid hexadecimal digit */
    for( ; inhex == YES; ++i){
        if(s[i] >= '0' && s[i] <= '9')
            hexdigit = s[i] - '0';
        else if(s[i] >= 'a' && s[i] <= 'f')
            hexdigit = s[i] - 'a' + 10;
        else if(s[i] >= 'A' && s[i] <= 'F')
            hexdigit = s[i] - 'A' + 10;
        else inhex = NO; /* not a valid hexadecimal digit */

        if (inhex == YES)
            n = 16 * n + hexdigit;
    }
    return n;
}