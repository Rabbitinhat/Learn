/*
 * @Author: chyon71 
 * @Date: 2018-07-10 00:13:35 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-10 00:17:45
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
int strrindex(char* s,char* t){
    int i, j, k, index;

    index = -1;
    for(i = 0; s[i] != '\0'; i++){
        for(j = i, k = 0; t[k] != '\0' && t[k] == s[j]; k++, j++)
            ;
        if(i > 0 && t[k] == '\0')
            index = i;
    }
    return index;
}