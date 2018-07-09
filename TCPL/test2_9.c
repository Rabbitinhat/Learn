#include<stdio.h>
//rewrite bitcount
int bitcount(unsigned x){
    int b;
    for(int i = 0; x != 0; x &= (x - 1)){
        if(x & 01)
            b++;
    }
    return b;
}