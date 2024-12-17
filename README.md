# js-utils

js 中常用的 util 方法；比如处理日期的函数，a 连接下载的，tree 数据平铺的，平铺数据转为 tree 数据的等等
好的，以下是完整的 `README.md` 文档，你可以一键复制：

# 工具函数

这个仓库包含了一些实用的工具函数，适用于各种用途。

## 函数列表

```javascript
npm install an-function

import { getLengthArray,chinaDate } from "an-function";

```

### 1. `getLengthArray(number = 0)`

生成一个从 1 到指定数字的数组。

**参数:**

- `number` (默认值: 0): 要生成的数组长度。

**返回值:**

- 一个从 1 到 `number` 的数组。

**示例:**

```javascript
import { getLengthArray } from "an-function";
console.log(getLengthArray(5)); // [1, 2, 3, 4, 5]
console.log(getLengthArray()); // []
```

### 2. `deepClone(obj)`

创建一个对象的深拷贝。

**参数:**

- `obj`: 要拷贝的对象。

**返回值:**

- 对象的深拷贝。

**示例:**

```javascript
const original = { a: 1, b: { c: 2 } };
const clone = deepClone(original);
console.log(clone); // { a: 1, b: { c: 2 } }
console.log(clone === original); // false
```

### 3. `chinaDate(times, fengefu = '-')`

将日期格式化为中国日期格式。

**参数:**

- `times`: 要格式化的日期(时间戳、2025-01-02 10:01:01、2025/01/01 12:09:08、new Date())。如果为 null 或 undefined，则使用当前日期。
- `fengefu` (默认值: '-'): 用于格式化日期的分隔符。

**返回值:**

- 一个包含各种日期格式和组件的对象。

**返回值选项:**

- `fengefu`: 分隔符
- `newDate`: 日期对象
- `nian`: 年
- `yue`: 月
- `ri`: 日
- `shi`: 时
- `fen`: 分
- `miao`: 秒
- `date`: 完整日期时间字符串
- `date0`: 当天零点的日期时间字符串
- `date59`: 当天 23:59:59 的日期时间字符串
- `nyr`: 年月日字符串
- `sfm`: 时分秒字符串
- `number`: 时间戳
- `get0`: 当天零点的时间戳
- `get59`: 当天 23:59:59 的时间戳

**示例:**

```javascript
const dateInfo = chinaDate("2023-10-01 12:34:56");
console.log(dateInfo.date); // "2023-10-01 12:34:56"
console.log(dateInfo.nyr); // "2023-10-01"
console.log(dateInfo.sfm); // "12:34:56"
```

### 4. `getUrlParams(urlSearch)`

将 URL 参数解析为对象。

**参数:**

- `urlSearch`: URL 的查询字符串。

**返回值:**

- 一个包含解析后的 URL 参数的对象。

**示例:**

```javascript
console.log(getUrlParams("?name=John&age=30")); // { name: 'John', age: '30' }
console.log(getUrlParams("name=John&age=30")); // { name: 'John', age: '30' }
```

### 5. `aDownLoad(href, fileName = '')`

通过创建一个锚点元素触发文件下载。

**参数:**

- `href`: 要下载的文件的 URL。
- `fileName` (默认值: ''): 要下载的文件名。

**示例:**

```javascript
aDownLoad("https://example.com/file.txt", "example.txt");
```

### 6. `aDownLoad2(response, fileName = '')`

从 Blob 响应中触发文件下载。

**参数:**

- `response`: 要下载的 Blob 响应。
- `fileName` (默认值: ''): 要下载的文件名。

**示例:**

```javascript
const response = new Blob(["Hello, world!"], { type: "text/plain" });
aDownLoad2(response, "hello.txt");
```

### 7. `objKeysHasValue(obj = {}, keys = [], type = 'some')`

检查对象中的某些或所有指定键是否有值。

**参数:**

- `obj` (默认值: {}): 要检查的对象。
- `keys` (默认值: []): 要检查的键。
- `type` (默认值: 'some'): 检查类型（'some' 或 'all'）。

**返回值:**

- 如果条件满足，返回 `true`，否则返回 `false`.

**示例:**

```javascript
const obj = { a: 1, b: null, c: 3 };
console.log(objKeysHasValue(obj, ["a", "b"], "some")); // true
console.log(objKeysHasValue(obj, ["a", "b"], "all")); // false
console.log(objKeysHasValue(obj, ["a", "c"], "all")); // true
```

### 8. `anIntervalF`

使用 Web Workers 的自定义定时器。可以防止浏览器页签长时间退居后台后触发节能模式导致原本的定时器失效问题。

**方法:**

- `on(fn, time)`: 注册一个在指定间隔时间调用的函数。
- `off(id)`: 注销一个函数。

**示例:**

```javascript
const id = anIntervalF.on(() => {
  console.log("自定义webWork定时器被调用");
}, 1000);

setTimeout(() => {
  anIntervalF.off(id);
  console.log("自定义webWork定时器已注销");
}, 5000);
```

### 9. `fileToBase64(file)`

将文件转换为 Base64 编码。

**参数:**

- `file`: 要转换的文件对象。

**返回值:**

- 返回一个 Promise 对象，解析为 Base64 编码的字符串。

**示例:**

```javascript
// HTML 部分
// <input type="file" id="fileInput">

// JavaScript 部分
import { fileToBase64 } from "an-function";

const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  fileToBase64(file)
    .then((base64) => {
      console.log(base64);
    })
    .catch(() => {
      console.error("文件转换失败");
    });
});
```
