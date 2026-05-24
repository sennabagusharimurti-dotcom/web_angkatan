import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const inputGeoPath = path.join(rootDir, 'src/assets/maps/id.json')
const inputProvincePath = path.join(rootDir, 'src/assets/maps/province.json')
const outputPath = path.join(rootDir, 'src/assets/maps/indonesia-map-generated.json')

const SVG_WIDTH = 1440
const SVG_HEIGHT = 520
const SVG_PADDING = 30

const readJson = async (filePath) => JSON.parse(await readFile(filePath, 'utf8'))

const getBounds = (features) => {
  let minLon = Infinity
  let maxLon = -Infinity
  let minLat = Infinity
  let maxLat = -Infinity

  const pushPoint = ([lon, lat]) => {
    if (lon < minLon) minLon = lon
    if (lon > maxLon) maxLon = lon
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
  }

  features.forEach(({ geometry }) => {
    if (geometry.type === 'Polygon') {
      geometry.coordinates.forEach((ring) => {
        ring.forEach(pushPoint)
      })
      return
    }

    geometry.coordinates.forEach((polygon) => {
      polygon.forEach((ring) => {
        ring.forEach(pushPoint)
      })
    })
  })

  return { minLon, maxLon, minLat, maxLat }
}

const createProjectPoint = (bounds) => {
  const lonRange = bounds.maxLon - bounds.minLon || 1
  const latRange = bounds.maxLat - bounds.minLat || 1
  const mapScale = Math.min((SVG_WIDTH - SVG_PADDING * 2) / lonRange, (SVG_HEIGHT - SVG_PADDING * 2) / latRange)
  const offsetX = (SVG_WIDTH - lonRange * mapScale) / 2
  const offsetY = (SVG_HEIGHT - latRange * mapScale) / 2

  return ([lon, lat]) => {
    const x = (lon - bounds.minLon) * mapScale + offsetX
    const y = (bounds.maxLat - lat) * mapScale + offsetY
    return [x, y]
  }
}

const buildRingPath = (ring, projectPoint) => {
  if (!ring.length) return ''

  const [firstPoint, ...restPoints] = ring
  const [startX, startY] = projectPoint(firstPoint)
  const start = `M ${startX.toFixed(2)} ${startY.toFixed(2)}`
  const lines = restPoints
    .map((point) => {
      const [x, y] = projectPoint(point)
      return `L ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')

  return `${start} ${lines} Z`
}

const buildPolygonPath = (rings, projectPoint) => rings.map((ring) => buildRingPath(ring, projectPoint)).join(' ')

const buildGeometryPath = (geometry, projectPoint) => {
  if (geometry.type === 'Polygon') {
    return buildPolygonPath(geometry.coordinates, projectPoint)
  }

  return geometry.coordinates.map((polygon) => buildPolygonPath(polygon, projectPoint)).join(' ')
}

const getGeometryCenter = (geometry) => {
  let minLon = Infinity
  let maxLon = -Infinity
  let minLat = Infinity
  let maxLat = -Infinity

  const pushPoint = ([lon, lat]) => {
    if (lon < minLon) minLon = lon
    if (lon > maxLon) maxLon = lon
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
  }

  if (geometry.type === 'Polygon') {
    geometry.coordinates.forEach((ring) => {
      ring.forEach(pushPoint)
    })
  } else {
    geometry.coordinates.forEach((polygon) => {
      polygon.forEach((ring) => {
        ring.forEach(pushPoint)
      })
    })
  }

  return [(minLon + maxLon) / 2, (minLat + maxLat) / 2]
}

const main = async () => {
  const geoData = await readJson(inputGeoPath)
  const provinceMap = await readJson(inputProvincePath)
  const bounds = getBounds(geoData.features)
  const projectPoint = createProjectPoint(bounds)

  const provinces = geoData.features.map((feature) => {
    const provinceInfo = provinceMap[feature.properties.id]
    const [centerX, centerY] = projectPoint(getGeometryCenter(feature.geometry))

    return {
      id: feature.properties.id,
      province: provinceInfo?.province ?? feature.properties.name,
      totalMahasiswa: provinceInfo?.totalMahasiswa ?? 0,
      path: buildGeometryPath(feature.geometry, projectPoint),
      centerX: Number(centerX.toFixed(2)),
      centerY: Number(centerY.toFixed(2)),
      fillClassName: provinceInfo?.fillClassName ?? 'fill-neutral-cs-10'
    }
  })

  const output = {
    svgWidth: SVG_WIDTH,
    svgHeight: SVG_HEIGHT,
    provinces
  }

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf8')
  console.log(`Generated ${path.relative(rootDir, outputPath)} with ${provinces.length} provinces.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
