/**
 * 生成一个从 1 到指定数字的数组。
 * @param {number} [number=0] - 要生成的数组长度。
 * @returns {number[]} 一个从 1 到 `number` 的数组。
 */
export function getLengthArray(number = 0) {
  let linshi = [];
  for (var i = 1; i <= number; i++) {
    linshi.push(i);
  }
  return linshi;
}

/**
 * 创建一个对象的深拷贝。
 * @param {Object} obj - 要拷贝的对象。
 * @param {WeakMap} [hash=new WeakMap()] - 用于处理循环引用的 WeakMap。
 * @param {boolean} [copyContructor=false] - 是否拷贝构造函数。
 * @returns {Object} 对象的深拷贝。
 */
export function deepClone(obj, hash = new WeakMap(), copyContructor = false) {
  // 如果浏览器支持 structuredClone，则使用它
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }

  // 处理循环引用
  if (hash.has(obj)) return hash.get(obj);

  // 处理基本类型和特殊对象
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 创建克隆对象
  const cloneObj = Array.isArray(obj) ? [] : {};

  // 记录当前对象的克隆
  hash.set(obj, cloneObj);

  // 递归拷贝对象属性
  for (let key in obj) {
    if (copyContructor || Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key], hash, copyContructor);
    }
  }

  return cloneObj;
}


/**
 * 将日期格式化为中国日期格式。
 * @param {string|Date|null｜number} times - 要格式化的日期。如果为 null 或 undefined，则使用当前日期。
 * @param {string} [fengefu='-'] - 用于格式化日期的分隔符。
 * @returns {Object} 一个包含各种日期格式和组件的对象。
 */
export function chinaDate(times, fengefu = '-') {
  if (times === null || times === undefined) {
    times = new Date();
  }
  if (typeof times === 'string') {
    times = times.replace(/-/g, '/');
  }
  fengefu = fengefu || '/';
  const time = new Date(times);
  const nian = time.getFullYear();
  const yue = ('00' + (time.getMonth() + 1)).slice(-2);
  const ri = ('00' + time.getDate()).slice(-2);
  const shi = ('00' + time.getHours()).slice(-2);
  const fen = ('00' + time.getMinutes()).slice(-2);
  const miao = ('00' + time.getSeconds()).slice(-2);
  const get0 = new Date(nian + '/' + yue + '/' + ri + ' 00:00:00').getTime();
  const get59 = new Date(nian + '/' + yue + '/' + ri + ' 23:59:59').getTime();

  return {
    fengefu,
    newDate: time,
    nian,
    yue,
    ri,
    shi,
    fen,
    miao,
    date: nian + fengefu + yue + fengefu + ri + ' ' + shi + ':' + fen + ':' + miao,
    date0: nian + fengefu + yue + fengefu + ri + ' ' + '00:00:00',
    date59: nian + fengefu + yue + fengefu + ri + ' ' + '23:59:59',
    nyr: nian + fengefu + yue + fengefu + ri,
    sfm: shi + ':' + fen + ':' + miao,
    number: time.getTime(),
    get0,
    get59,
  };
}

/**
 * 将 URL 参数解析为对象。
 * @param {string} [url=window.location.href] - URL 字符串。如果未提供，则使用当前页面的 URL。
 * @returns {Object} 一个包含解析后的 URL 参数的对象。
 */
export function getUrlParams(url = window.location.href) {
  if (url.length === 0) {
    return {};
  } else {
    let url = decodeURIComponent(url);
    const queryParams = url.startsWith('?') ? url.split('?')[1] : url.split('?')[0];
    let finallyData = {};
    var vars = queryParams.length > 0 ? queryParams.split('&') : [];
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      finallyData[pair[0]] = pair[1];
    }
    return finallyData;
  }
}

/**
 * 通过创建一个锚点元素触发文件下载。
 * @param {string} href - 要下载的文件的 URL。
 * @param {string} [fileName=''] - 要下载的文件名。
 */
export function aDownLoad(href, fileName = '') {
  console.log(href, fileName);
  const aDownload = window.document.createElement('a');
  aDownload.style.display = 'none';
  aDownload.setAttribute('downLoad', fileName);
  aDownload.setAttribute('href', href);
  document.body.appendChild(aDownload);
  aDownload.click();
  document.body.removeChild(aDownload);
}

/**
 * 从 Blob 响应中触发文件下载。
 * @param {Blob} response - 要下载的 Blob 响应。
 * @param {string} [fileName=''] - 要下载的文件名。
 */
export function aDownLoad2(response, fileName = '') {
  const blob = new Blob([response]);
  aDownLoad(URL.createObjectURL(blob), fileName);
}

/**
 * 检查对象中的某些或所有指定键是否有值。
 * @param {Object} [obj={}] - 要检查的对象。
 * @param {string[]} [keys=[]] - 要检查的键。
 * @param {string} [type='some'] - 检查类型（'some' 或 'all'）。
 * @returns {boolean} 如果条件满足，返回 `true`，否则返回 `false`。
 */
export const objKeysHasValue = (obj = {}, keys = [], type = 'some') => {
  if (type === 'some') {
    /*keys中的某一个是有值的*/
    return keys.some((item, index) => {
      return ![null, '', undefined].includes(obj[item]);
    });
  } else {
    /*keys中的全部是有值的*/
    return keys.every((item, index) => {
      return ![null, '', undefined].includes(obj[item]);
    });
  }
};

/**
 * 使用 Web Workers 的自定义间隔函数。
 * @returns {Object} 包含 `on` 和 `off` 方法的对象。
 */
export const anIntervalF = (function () {
  let worker;
  const listeners = new Map();

  function createWorker() {
    const script = `
      const intervals = new Map();
      onmessage = function(event) {
        const { id, time } = event.data;
        if (intervals.has(id)) {
          clearInterval(intervals.get(id));
        }
        function anIntervalF() {
          postMessage({ id });
          intervals.set(id, setTimeout(anIntervalF, time));
        }
        anIntervalF();
      }
    `;
    const blob = new Blob([script], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    worker = new Worker(url);

    worker.addEventListener('message', function (e) {
      const { id } = e.data;
      if (listeners.has(id)) {
        listeners.get(id).forEach(fn => fn());
      }
    });
  }

  /**
   * 注册一个在指定间隔时间调用的函数。
   * @param {Function} fn - 要调用的函数。
   * @param {number} time - 间隔时间（毫秒）。
   * @returns {Symbol} 注册的函数的 ID。
   */
  function on(fn, time) {
    if (!worker) {
      createWorker();
    }
    const id = Symbol();
    if (!listeners.has(id)) {
      listeners.set(id, []);
    }
    listeners.get(id).push(fn);
    worker.postMessage({ id, time });
    return id;
  }

  /**
   * 注销一个函数。
   * @param {Symbol} id - 要注销的函数的 ID。
   */
  function off(id) {
    if (listeners.has(id)) {
      listeners.delete(id);
    }
  }

  return { on, off };
})();

// file转base64
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      reject();
    }
  });
}