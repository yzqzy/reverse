// https://wxsm.space/2018/fill-jd-slider-captcha-by-puppeteer/
// 效果很差，弃用

export const get_track = () => {
  /**
   * combine rgba colors [r, g, b, a]
   * @param rgba1 底色
   * @param rgba2 遮罩色
   * @returns {number[]}
   */
  function combineRgba(rgba1, rgba2) {
    const [r1, g1, b1, a1] = rgba1
    const [r2, g2, b2, a2] = rgba2
    const a = a1 + a2 - a1 * a2
    const r = (r1 * a1 + r2 * a2 - r1 * a1 * a2) / a
    const g = (g1 * a1 + g2 * a2 - g1 * a1 * a2) / a
    const b = (b1 * a1 + b2 * a2 - b1 * a1 * a2) / a
    return [r, g, b, a]
  }

  /**
   * 判断两个颜色是否相似
   * @param rgba1
   * @param rgba2
   * @param t
   * @returns {boolean}
   */
  function tolerance(rgba1, rgba2, t) {
    const [r1, g1, b1] = rgba1
    const [r2, g2, b2] = rgba2
    return r1 > r2 - t && r1 < r2 + t && g1 > g2 - t && g1 < g2 + t && b1 > b2 - t && b1 < b2 + t
  }

  function createCanvas(width, height) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
  }

  function getVerifyPosition(base64, actualWidth) {
    return new Promise((resolve, reject) => {
      const canvas = createCanvas(1000, 1000)
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.onload = () => {
        const width = img.naturalWidth
        const height = img.naturalHeight
        ctx.drawImage(img, 0, 0)
        const maskRgba = [0, 0, 0, 0.65]
        const t = 10 // 色差容忍值
        let prevPixelRgba = null
        for (let x = 0; x < width; x++) {
          // 重新开始一列，清除上个像素的色值
          prevPixelRgba = null
          for (let y = 0; y < height; y++) {
            const rgba = ctx.getImageData(x, y, 1, 1).data
            if (prevPixelRgba) {
              // 所有原图中的 alpha 通道值都是1
              prevPixelRgba[3] = 1
              const maskedPrevPixel = combineRgba(prevPixelRgba, maskRgba)
              // 只要找到了一个色值匹配的像素点则直接返回，因为是自上而下，自左往右的查找，第一个像素点已经满足"最近"的条件
              if (tolerance(maskedPrevPixel, rgba, t)) {
                resolve((x * actualWidth) / width)
                return
              }
            } else {
              prevPixelRgba = rgba
            }
          }
        }
        // 没有找到任何符合条件的像素点
        resolve(0)
      }
      img.onerror = reject
      img.src = base64
    })
  }

  const elem = document.querySelector('.JDJRV-bigimg > img')
  const width = parseInt(window.getComputedStyle(elem).width)

  return getVerifyPosition(elem.src, width)
}
