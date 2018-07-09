/*
 * @Author: chyon71 
 * @Date: 2018-07-05 11:17:07 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-05 11:30:41
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
 //binsearch function
 int binsearch(int x, int v[], int n){
     int low, high, mid;

     low = 0;
     high = n - 1;
     while(low <= high){
         mid = low + (high - low)/2;
        if(x > v[mid]) low = mid + 1;
        else if (x < v[mid]) high = mid - 1;
        else return mid;
     }
     return -1;
 }

 int binsearch(int x, int s[], int n){
     int low, high, mid;
     low = 0;
     high = n - 1;
     mid = low + (high - low)/2;
     while(low <= high && x != s[mid]){
         if(x > s[mid]) low = mid + 1;
         else high = mid - 1;
         mid = low + (high - low)/2;
     }
     if(x == s[mid])
        return mid;
    else return -1;
 }