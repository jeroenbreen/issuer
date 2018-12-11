import Vue from 'vue';

function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

const documentIdFormatter = Vue.filter('documentIdFormatter', function (type, value) {
    switch (type) {
        case '3zeros':
            let s = String(value);
            while (s.length < (3 || 2)) {s = "0" + s;}
            return s;

        case 'roman':
            return romanize(Number(value));
    }
});

export {documentIdFormatter}