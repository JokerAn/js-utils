
export function getLengthArray(number = 0) {
  let linshi = [];
  for (var i = 1; i <= number; i++) {
    linshi.push(i);
  }
  return linshi;
}
export function deepClone(obj, hash = new WeakMap(), copyContructor = false) {
  hash = hash || new WeakMap();
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== 'object') return obj;
  if (hash.has(obj)) return hash.get(obj);
  let cloneObj = {};
  if (Array.isArray(obj)) {
    cloneObj = [];
  }
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (copyContructor) {
      cloneObj[key] = deepClone(obj[key], hash, copyContructor);
    } else {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        cloneObj[key] = deepClone(obj[key], hash);
      }
    }
  }
  return cloneObj;
}
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
export function getUrlParams(urlSearch) {
  console.log('getUrlParams函数执行了');
  if (urlSearch.length === 0) {
    return {};
  } else {
    if (urlSearch.startsWith('?')) {
      return qs.parse(urlSearch.slice(1));
    } else {
      return qs.parse(urlSearch);
    }
  }
}
export const isLocal = () => {
  return ['127.0.0.1', 'localhost'].includes(window.location.hostname);
};
// 单纯a连接下载
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
// 流下载
export function aDownLoad2(response, fileName = '') {
  const blob = new Blob([response]);
  aDownLoad(URL.createObjectURL(blob), fileName);
}
//对象中的某几个key 其中一个有值 或者全部有值
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