/*
 * @Author: chyon71 
 * @Date: 2018-06-29 17:40:37 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-06-29 18:03:26
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
//delete the same char in s2
void squeze(char s1[], char s2[]){
    int i, j, m;
    for(j = 0; s2[j] != '\0'; j++)
        for(i = m = 0; s1[i] != '\0'; i++)
            if(s1[i] != s2[j])
                s1[m++] = s1[i];
    s1[m] = '\0';
}

//Answer
/* squeeze: delete each char in s1 which is in s2 */
void squeeze(char s1[], char s2[]){
    int i, j, k;

    for(i = k = 0; s1[i] != '\0'; i++){
        for(j = 0; s2[j] != '\0' && s1[i] != s2[j] ; j++)
            ;
        if(s2[j] == '\0')
            s1[k++] = s1[i];
    }
    s1[k] = '\0';
}
