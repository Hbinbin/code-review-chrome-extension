/* eslint-disable no-undef */
const color = '#3aa757'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color })
  console.log('Default background color set to %cgreen', `color: ${color}`)
})
// chrome.windows.create({ url: 'index.html', type: 'popup', height: 200, width: 200 })
console.log('666')
// chrome.contextMenus.create({
//   title: '测试右键菜单',
//   onclick: function () {
//     alert('您点击了右键菜单！')
//   }
// })
