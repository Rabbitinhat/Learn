/*
 * @Author: chyon71 
 * @Date: 2018-07-05 11:05:17 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-05 11:06:45
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */

int lower(char s){
    return (s >= 'A' && s <= 'Z')? s += 'a' - 'A': s;
}