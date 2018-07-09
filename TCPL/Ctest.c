//shellsort
void shellsort(int v[], int n)
{
    int gap, j, i, temp;
    for(gap = n/2; gap > 0; gap /= 2)
        for(i = gap; i < n; i++)
            for(j=i-gap; j>=0 && v[j]>v[j+gap]; j-=gap){
                temp = v[j];
                v[j] = v[j+gap];
                v[j+gap] = temp;
            }
}

#include<string.h>

void reverse(char s[])
{
    int c, i, j;
    
    for(i = 0, j = strlen(s) - 1; i < j; i++, j--){
        c = s[i];
        s[i] = s[j];
        s[j] = c;
    }
}

//P50 atoi
#include <ctype.h>

/* 将s转换为整型数；版本2 */
int atoi(char s[]){
    int i, n, sign;

    for(i = 0; isspace(s[i]); i++)
        ;
    sign = (s[i] == '-') ? -1 : 1;
    if(s[i] == '+' || s[i] == '-')
        i++;
    for(n = 0; isdigit(s[i]); i++)
        n = n * 10 + (s[i] - '0');
    return sign * n;
}

//p58
#include<stdio.h>
#define MAXLINE 1000

int getline(char line[], int max);
int strindex(char source[], char searchfor[]);

char pattern[] = "ould";

main(){
    char line[MAXLINE];
    int found = 0;

    while(getline(line, MAXLINE) > 0)
        if(strindex(line, pattern) >= 0){
            printf("%s", line);
            found++;
        }
    return found;
}

int getline(char s[], int lim){
    int c, i;
    i = 0;
    while(--lim > 0 && (c = getchar()) != EOF && c != '\n')
        s[i++] = c;
    if(c == '\n')
        s[i++] = c;
    s[i] = '\0';
    return i;
}

int strindex(char s[], char t[]){
    int i, j, k;

    for(i = 0; s[i] != '\0'; i++){
        for(j=i, k=0; t[k]!='\0' && s[j]==t[k]; j++, k++)
            ;
        if(k>0 && t[k]=='\0')
            return i;
    }
    return -1;
}

#include<ctype.h>

double atof(char s[])
{
    double val, power;
    int i, sign;

    for(i = 0; isspace(s[i]); i++)
        ;
    sign = (s[i] == '-')? -1 : 1;
    if(s[i] == '+' || s[i] == '-')
        i++;
    for(val = 0.0; isdigi(s[i]); i++)
        val = 10.0 * val + (s[i] - '0');
    if(s[i] == '.')
        i++;
    for(power = 1.0; isdigit(s[i]); i++){
        val = 10.0 * val + (s[i] - '0');
        power *= 10.0;
    }
    return sign * val / power;
}

#include <stdio.h>

#define MAXLINE 100

main(){
    double sum, atof(char []);
    char line[MAXLINE];
    int getline(char line[], int max);

    sum = 0;
    while(getline(line, MAXLINE) > 0)
        printf("\t%g\n", sum += atof(line));
    return 0;
}

int atoi(char s[]){
    double atof(char s[]);
    return (int)atof(s); 
}