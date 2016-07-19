# art-velocity
## arttemplate转换成velocity语法
1.
{{if admin}}
    <p>admin</p>
{{else if code > 0}}
    <p>master</p>
{{else}}
    <p>error!</p>
{{/if}}
```
    #if($admin)
    #elseif($code > 0)
    #else
    #end
```
2.
{{each list as value i}}{{/each}}
{{each list}}{{/each}}

```
    #foreach($value in $list)
    #set(i = #foreach.index)
    #end
```
注：art遍历  默认索引值{{$index}}，遍历的每一项默认取值{{$value}}
3.
{{name}}编码输出，转义html字符
```
    ${name}

```
{{#name}}原样输出

```
    $esc.javascript($name);

```
4.
{{include}}

```
    #parse

```
## mustache转换velocity
1.变量输出
{{name}}转义输出
{{{name}}}非转义输出

2.存在时，遍历
{{#list}} {{/list}}

3.当list为null,undefined,false时输出
{{^list}}{{/list}}

4.枚举
{{.}}

5.引入子模板
{{>partiral}}

6.注释
{{!comments}}
