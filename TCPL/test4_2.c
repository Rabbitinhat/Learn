double atof(char s[])
{
    double val, power, power2, val2, num;
    int i, sign, sign2, n;

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
    val = sign * val / power;
    if(s[i] == 'e' || s[i] == 'E'){
        i++;
    (s[i] == '-') ? sign2 = -1: sign2 = 1;
    if(s[i] == '-' || s[i] == '+') i++;
    for(val2 = 0; isdigit(s[i]); i++){
        val2 = 10 * val + (s[i] - '0');
    }
    for(n = 0, power2 = 1.0; n < val2; n++){
        power2 = 10*power2;
    }
    if(sign2 = -1){
        num = (val) / power2;
    } else {
        num = (val) * power2;
    }
    }
    return num;
}