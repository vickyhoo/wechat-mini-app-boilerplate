function saveImgToAlbum(imgUrl, toast) {
  wx.getImageInfo({
    src: imgUrl,
    success: (res) => {
      let path = res.path
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success: (res) => {
          console.log(res)
          wx.showToast({
            title: toast,
            icon: 'success',
            duration: 800
          })
        },
        fail: (res) => {
          console.log(res)
        }
      })
    },
    fail: (res) => {
      console.log(res)
    }
  })
}

export function saveImg(imgUrl, toast = '保存成功') {
  //用户需要授权
  wx.getSetting({
    success: (res) => {
      if (
        typeof res.authSetting['scope.writePhotosAlbum'] != 'undefined' &&
        !res.authSetting['scope.writePhotosAlbum']
      ) {
        // 用户拒绝了授权
        wx.showModal({
          title: '提示',
          content: '您之前拒绝了授权，将无法使用保存图片功能，请前往设置页面打开相册权限',
          // cancelText: '不授权',
          // cancelColor: '#999',
          // confirmText: '去授权',
          // confirmColor: '#e98f4c',
          success: (res) => {
            if (res.confirm) {
              // 跳转设置页面
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting['scope.writePhotosAlbum']) {
                    // 同意授权
                    saveImgToAlbum(imgUrl, toast)
                  } else {
                    // 没有允许定位权限
                    wx.showToast({
                      title: '您拒绝了授权，将无法使用保存图片功能',
                      icon: 'none'
                    })
                  }
                }
              })
            }
          }
        })
      }
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success: () => {
            // 同意授权
            saveImgToAlbum(imgUrl, toast)
          },
          fail: (res) => {
            console.log('reject')
            console.log(res)
            wx.showToast({
              title: '您拒绝了授权，将无法使用保存图片功能',
              icon: 'none'
            })
          }
        })
      } else {
        // 已经授权了
        saveImgToAlbum(imgUrl, toast)
      }
    },
    fail: (res) => {
      console.log(res)
    }
  })
}
