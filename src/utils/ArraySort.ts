export function compare(p: any) {
  //这是比较函数
  return function (m: any, n: any) {
    var a = m[p]
    var b = n[p]
    return b - a //降序
  }
}
