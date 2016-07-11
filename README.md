# art-velocity
## arttemplate转换成velocity语法
1.{{if admin}}
    <p>admin</p>
{{else if code > 0}}
    <p>master</p>
{{else}}
    <p>error!</p>
{{/if}}
```
    #if(admin)
    #elseif(code>0)
    #else
    #end
```
2.{{each list as value i}}{{/each}}
```
#foreach(value in list)
#set(i = #foreach.index)
#end
```
注：art遍历  默认索引值{{$index}}，遍历的每一项值{{$value}}
3.{{name}}编码输出，转义html字符
```
${name}

```
{{#name}}不编码输出
4.{{include}}
```
#include

```
