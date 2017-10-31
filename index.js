var postcss = require('postcss');

function prepare( str, selectors, prefix ){
    for(var i = 0; i < selectors.length; i++){
        var idx = str.indexOf(selectors[i]);
        if( idx > -1 ){
            str = '%' + prefix + str.substr(idx +1);
        }
    }

    return str;
}
 
module.exports = postcss.plugin('scss-placeholders', function scssPlaceholders(options) {
    options = options || {};
    prefix = options.prefix || "";
    selectors = ["#", "."];

    return function (css, result) {

        css.walkRules(function (rule) {
            var selector = rule.selector,
                matches = selector.match( /(\s*?[#\.][-\w\d\s,\>\~\+\:\&]+\s*?)/g );

            if (matches !== null) {
                for(var i = 0; i < matches.length; i++){
                    matches[i] = prepare(matches[i], selectors, prefix);
                }

                rule.selector = matches.join("");
            }
        });

    };
 
});