# strin

```
echo aAa bBb | strin replace --t="[ab]" --v="c" --sr="ig"
echo aAa bBb | strin split --t="A" | strin join --t="" | strin replace --t="B" --v=""
```
