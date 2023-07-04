import AMapLoader from '@amap/amap-jsapi-loader'
import lottie from 'lottie-web'
import makerLottieJson from '../assets/lottieAnimationJson/3532-car.json'

window._AMapSecurityConfig = {
  securityJsCode: import.meta.env.VITE_AMAP_SECURITY_JSCODE
}

class MapUtils {
  addInfoWindow = null
  amapInfoWindow = null
  map = null
  mapZoom = null
  static timeHandleIds1 = []
  static timeHandleIds2 = []
  lottieOptions = {
    animationData: makerLottieJson
  }
  static lottieDomList = []
  static async init(pointList = []) {
    AMapLoader.load({
      key: import.meta.env.VITE_AMAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      plugins: [
        'AMap.DistrictSearch',
        'AMap.Scale',
        'AMap.ToolBar',
        'AMap.MarkerCluster'
      ],
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      Loca: {
        version: '2.0.0'
      }
    })
      .then(async (AMap) => {
        this.map = new AMap.Map('container', {
          zoom: 4, // 地图打开时缩放级别
          zooms: [2, 17.5],
          resizeEnable: true,
          center: [113.26,23.13], // 起始显示的中心位置
          viewMode: '3D',
          mapStyle: 'amap://styles/whitesmoke'
        })
        await this.addMarker(this.map, pointList)
        await this.map.setFitView()
        await this.map.setZoom(4)

        this.map.on('zoomchange', (e) => {
          this.destroyLottie()
          const zoom = this.map.getZoom()
          this.mapZoom = zoom
        })
        this.map.on('dragstart', (e) => {
        })
        this.map.on('dragging', (e) => {
          this.destroyLottie()
        })
        this.map.on('dragend', (e) => {
        })
      })
      .catch((e) => {
        console.error(e) // 加载错误提示
      })
  }
  static createMapPointLottie(
    animationData,
    cluster,
    setSpeed = 0.5
  ) {
    const mainEl = document.createElement('div')
    const textEL = document.createElement('span')
    mainEl.style.width = '70px'
    mainEl.style.height = '70px'
    textEL.style.position = 'absolute'
    textEL.style.top = '0'
    textEL.style.left = '0'
    textEL.style.right = '0'
    textEL.style.bottom = '0'
    textEL.style.margin = 'auto'
    textEL.style.lineHeight = '12px'
    textEL.style.height = '12px'
    textEL.style.fontSize = '12px'
    textEL.style.textAlign = 'center'
    textEL.style.color = '#fff'
    textEL.style.zIndex = '99'
    mainEl.style.display = 'flex'
    mainEl.style.justifyContent = 'center'
    mainEl.style.alignItems = 'center'
    mainEl.appendChild(textEL)
    const anim = lottie.loadAnimation({
      container: mainEl, // 容器
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData: animationData
    })
    anim.setSpeed(setSpeed)
    this.lottieDomList.push(anim)
    cluster.marker.setOffset(new AMap.Pixel(0, 0))
    cluster.marker.setAnchor('center')
    cluster.marker.setContent(mainEl)
  }
  static destroyLottie() {
    for (let i = 0; i < this.lottieDomList.length; i++) {
      this.lottieDomList[i].destroy()
    }
    this.lottieDomList = []
  }
  static playLottie() {
    try {
      for (let i = 0; i < this.lottieDomList.length; i++) {
        setTimeout(() => {
          if (this.lottieDomList[i]) this.lottieDomList[i].play()
        }, i * 500)
      }
    } catch (e) {}
  }
  static async addMarker(map, pointList) {
    map.clearMap() // 清除地图覆盖物
    let marker = null
    marker = new AMap.MarkerCluster(map, pointList, {
      gridSize: 60,
      renderClusterMarker: (cluster) => {
        this.createMapPointLottie(makerLottieJson, cluster, )
        this.playLottie()
        cluster.marker.on('mouseover', (e) => {})
        cluster.marker.on('mouseout', (e) => {
        })
      },
      renderMarker: (cluster) => {
        this.createMapPointLottie(makerLottieJson, cluster)
        this.playLottie()
        cluster.marker.on('mouseover', (e) => {
        })
        cluster.marker.on('mouseout', (e) => {
        })
      }
    })
    marker.on('click', (res) => {
      console.log(res)
    })
  }
  static mapMoveTo(lng, lat) {
    this.map.setZoomAndCenter(17.5, [lng, lat])
  }
}
export default MapUtils
