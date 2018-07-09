/*
 * @Author: chyon71 
 * @Date: 2018-07-05 11:32:08 
 * @Last Modified by: chyon71
 * @Last Modified time: 2018-07-05 12:42:58
 * @The Answer : The C Answer Book by Clovis L. Tondo & Scott E. Gimpel 
 */
//escape
void escape(char* s, char* t){
    int i, j;
    for(i = 0, j = 0; t[i] != '\0'; i++){
        swith(t[i]){
            case '\t': s[j++] = '\\'; 
                        s[j++] = 't';
                        break;
            case '\n': s[j++] = '\\';
                        s[j++] = 'n';
                        break;
            default: s[j++] = t[i];
                        break;
        }
    }
    s[j] = '\0';
}

void rescape(char* s, char* t){
    int i, j;
    for(i = 0, j = 0; t[i] != '\0'; i++){
        if(t[i] == '\\'){
            switch(t[++i]){
                case 'n': s[j++] = '\n'; break;
                case 't': s[j++] = '\t'; break;
                default: s[j++] = '\\';
                            s[j++] = t[i];
                            break;
        }} 
        else
            s[j++] == t[i];
    }
    s[j] = '\0';
}

//Answer
/* unescape: convert escape sequences into real characters */
/* while copying the string t to s*/
void unescape(char s[], char t[]){
    int i, j;
    for(i = 0, j = 0; t[i] != '\0'; i++){
    switch(t[i]){
         case '\\':
            switch(t[++i]){
                case 'n':
                    s[j++] = '\n';
                    break;
                case 't':
                    s[j++] = '\t';
                    break;
                default:
                    s[j++] = '\\';
                    s[j++] = t[i];
                    break;
            }
            break;
        default:
            s[j++] = t[i];
            break;
    }
    s[j] = '\0';
}
}