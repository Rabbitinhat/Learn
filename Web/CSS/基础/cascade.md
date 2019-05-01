cascade 层叠

为了确认当多个来源的样式规则应用于某个文档元素时, 哪个规则会应用到文档元素上.

不同来源的样式规则重要性如下(重要性从低到高)

* user agent stylesheet
* user stylesheet
* author stylesheet
* author stylesheet importance
* user stylesheet importance

特殊性

对同一来源的样式规则, 不同的selector重要性如下

* inline style aka style attribute
* ID selector
* class selector attribute selector Pseduo-class selector
* element selector Pseduo-element selector

Universal selector(*) combinators(+ ~ > '') and negation pesudo-class(:not) no effact on specificity(0 ?)