/*
 * @Author: chyon71 
 * @Date: 2018-07-01 01:14:23 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-01 01:56:16
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
int rightrot(int x, int n){
    int save = ~(~0 << n) & x;
    int result = (save << (sizeof(n) * 8 - n)) | ((unsigned int)x >> n);
    return result;
}

//Answwer
/* rightrot: rotate x to the right by n positions*/
int rightrot(unsigned x, int n){
    int wordlength(viod);
    int rbit;

    while(n-- > 0){
        rbit = (x & 1) << (wordlength() - 1);
        x = x >> 1;
        x = x | rbit;
    }
    return x;
}
int wordlength(void){
    int i;
    unsigned v = (unsigned) ~0;
    for(i = 0; (v = v >> 1) > 0; i++)
        ;
    return i;
}

//another
unsigned rightrot(unsigned x, int n){
    int wordlength(void);
    unsigned rbits;

    if((n = n % wordlength()) > 0){
        rbits = ~(~0 << n) & x; /* n rightmost bits of x */
        rbits = rbits << (wordlength() - n);
        x = x >> n;
        x = x | rbits;
    }
    return x;
}