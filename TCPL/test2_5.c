/*
 * @Author: chyon71 
 * @Date: 2018-07-01 00:24:38 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-01 00:34:54
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
/* any: return first location in s1 where any char from s2 occures*/
int any(char s1[], char s2[]){
    int i, j;
    for(j = 0; s2[j] != '\0'; j++)
        for(i = 0; s1[i] != '\0'; i++)
            if(s1[i] == s2[j])
                return i;
    return -1;
}