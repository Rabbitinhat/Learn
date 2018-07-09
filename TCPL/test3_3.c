/*
 * @Author: chyon71 
 * @Date: 2018-07-09 22:34:46 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-09 23:04:23
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
//expand(x1, x2)
#include<ctype.h>

void expand(char* s1, char* s2){
    int i = 0, j = 0;
    char x;
    for( ; isspace(s1[i]); i++)
        ;
    (s1[i] == '-')? s2[j++] = s1[i++]: x = s1[i];
    for( ; s1[i] != '\0'; i++){
        if(s[i] == '-' && s[i+1] != '\0'){
                for(x=s[i-1]; x<s[i+1]; x++)
                    s2[j++] = x;
            } else s2[j++] = s[i];
        }
    s2[j] = '\0';
}

//Answer
/* expand: expand shorthand notation in s1 into string s2 */
void expand(char s1[], char s2[]){
    char c;
    int i, j;

    i = j = 0;
    while((c = s1[i++]) != '\0')
        if(s1[i] == '-' && s1[i + 1] >= c){
            i++;
            while(c < s1[i])
                s2[j++] = c++;
        } else 
            s2[j++] = c;
    s2[j++] = c;
}