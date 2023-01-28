// ==UserScript==
// @name               bilibili直播默认最高画质
// @name:zh-CN         bilibili直播默认最高画质
// @name:zh-TW         bilibili直播默認最高畫質
// @name:zh-HK         bilibili直播默認最高畫質
// @description        bilibili直播默认切换为最高画质
// @description:zh-CN  bilibili直播默认切换为最高画质
// @description:zh-TW  bilibili直播默認切換為最高畫質
// @description:zh-HK  bilibili直播默認切換為最高畫質
// @namespace          https://github.com/linkwanggo
// @version            2.1.2
// @author             linkwanggo
// @match              *://live.bilibili.com/*
// @exclude            *://live.bilibili.com/p*
// @icon               https://www.bilibili.com//favicon.ico
// @run-at             document-start
// @compatible         chrome
// @compatible         firefox
// @compatible         edge
// ==/UserScript==

;(function () {
  function process() {
    try {
      const livePlayer = document.querySelector('#live-player')
      livePlayer.dispatchEvent(new Event('mousemove'))
      const qualityWrap = livePlayer.querySelector('.quality-wrap')
      const observer = new MutationObserver(mutations => {
        mutations.some(mutation => {
          try {
            const qualities = mutation.target.querySelectorAll('.quality-it')
            if (qualities.length) {
              qualities[0].click()
              livePlayer.dispatchEvent(new Event('mouseleave'))
              return true
            }
            return false
          } catch (e) {
            console.error(e)
            return false
          } finally {
            observer.disconnect()
          }
        })
      })
      observer.observe(qualityWrap, { childList: true, subtree: true })
      qualityWrap.dispatchEvent(new Event('mouseenter'))
    } catch (e) {
      console.error(e)
    }
  }

  function live() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeName === 'VIDEO') {
            window.setTimeout(process, 400)
            observer.disconnect()
          }
        })
      })
    })
    observer.observe(document, { childList: true, subtree: true })
  }

  live()
})()
