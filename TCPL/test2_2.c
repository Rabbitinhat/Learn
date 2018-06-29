
/*
 * @Author: chyon71 
 * @Date: 2018-06-29 17:19:53 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-06-29 17:25:01
 */
void main(){
    int i = 0;
    while(1){
        if(i >= lim - 1){
            break;
        } else if((c = getchar()) == '\n'){
            break;
        } else if (c == EOF){
            break;
        } else {
            s[i] = c;
        }
        i++;

    }
}