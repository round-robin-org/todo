import React, { useState, useEffect, useRef, useCallback } from 'react'
import Map, { Popup, Source, Layer, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Task } from '@src/lib/types'
import mapboxgl from 'mapbox-gl'

interface MapViewProps {
  tasks: Task[]
  userLocation: { longitude: number, latitude: number } | null
}

export function MapView({ tasks, userLocation }: MapViewProps) {
  const [viewState, setViewState] = useState({
    longitude: userLocation ? userLocation.longitude : 139.6917, // デフォルト: 東京の経度
    latitude: userLocation ? userLocation.latitude : 35.6895,    // デフォルト: 東京の緯度
    zoom: 10
  })

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [hoveredTask, setHoveredTask] = useState<{ task: Task, longitude: number, latitude: number } | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  // ユーザーの位置情報が更新されたときにマップの中心を更新
  useEffect(() => {
    if (userLocation) {
      setViewState(prevState => ({
        ...prevState,
        longitude: userLocation.longitude,
        latitude: userLocation.latitude
      }))
    }
  }, [userLocation])

  // マップのサイズをレスポンシブにするためのハンドラー
  useEffect(() => {
    const handleResize = () => {
      // 必要に応じて処理を追加
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // GeoJSON形式に変換
  const geojson = {
    type: 'FeatureCollection',
    features: tasks.map(task => ({
      type: 'Feature',
      properties: {
        id: task.id,
        title: task.title,
        status: task.status
      },
      geometry: {
        type: 'Point',
        coordinates: [
          task.longitude ? task.longitude : 0,
          task.latitude ? task.latitude : 0
        ]
      }
    }))
  }

  // 色の定義
  const colorPlanned = 'hsl(45, 100%, 51%)'   // 予定タスク用色
  const colorExecuted = 'hsl(210, 90%, 56%)' // 実行タスク用色
  const colorIntermediate = 'hsl(0, 0%, 89.8%)' // 中間色

  // クラスタのレイヤースタイル
  const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'tasks',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        colorPlanned, // planned タスク用色
        10,
        colorIntermediate, // intermediate color
        30,
        colorExecuted // executed タスク用色
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        15,
        10,
        20,
        30,
        25
      ]
    }
  }

  // クラスタ内のラベルスタイル
  const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'tasks',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
    },
    paint: {
      'text-color': '#000'
    }
  }

  // 個別マーカーのレイヤースタイル
  const unclusteredPointLayer = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'tasks',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': [
        'match',
        ['get', 'status'],
        'planned', colorPlanned,
        'executed', colorExecuted,
        '#ccc'
      ],
      'circle-radius': 8,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
    }
  }

  // クラスタをクリックしたときの挙動
  const onClick = useCallback((event: mapboxgl.MapLayerMouseEvent) => {
    const feature = event.features && event.features[0]
    if (!feature) return

    const clusterId = feature.properties?.cluster_id
    const source: mapboxgl.GeoJSONSource = mapRef.current?.getSource('tasks') as mapboxgl.GeoJSONSource

    if (clusterId) {
      source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return

        setViewState(prevState => ({
          ...prevState,
          longitude: (feature.geometry as any).coordinates[0],
          latitude: (feature.geometry as any).coordinates[1],
          zoom: zoom
        }))
      })
    } else {
      const taskId = feature.properties?.id
      const task = tasks.find(t => t.id === taskId)
      if (task) {
        setSelectedTask(task)
      }
    }
  }, [tasks])

  // ホバー時のタスク表示
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const handleMouseMove = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['unclustered-point']
      })
      if (features.length > 0) {
        const feature = features[0]
        const taskId = feature.properties?.id
        const task = tasks.find(t => t.id === taskId)
        if (task) {
          setHoveredTask({
            task,
            longitude: task.longitude,
            latitude: task.latitude
          })
        }
      } else {
        setHoveredTask(null)
      }
    }

    const handleMouseLeave = () => {
      setHoveredTask(null)
    }

    map.on('mousemove', handleMouseMove)
    map.on('mouseleave', 'unclustered-point', handleMouseLeave)

    return () => {
      map.off('mousemove', handleMouseMove)
      map.off('mouseleave', 'unclustered-point', handleMouseLeave)
    }
  }, [tasks])

  return (
    <div className="w-full h-96 my-8">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        interactiveLayerIds={['clusters']}
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="tasks"
          type="geojson"
          data={geojson}
          cluster={true}
          clusterMaxZoom={20}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>

        {/* ユーザーの位置にアイコンと棒を表示 */}
        {userLocation && (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
            anchor="bottom" // ピンの基部が位置を指すように設定
            style={{ zIndex: 1 }}
          >
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* アイコン画像を上にずらす */}
              <img 
                src="/round_robin.png" // 既存のアイコン画像
                alt="ユーザーの現在位置" 
                style={{ 
                  width: '30px', 
                  height: '30px', 
                  pointerEvents: 'none',
                  transform: 'translateY(-15px)' // アイコンを上に15pxずらす
                }} 
              />
            </div>
          </Marker>
        )}

        {selectedTask && (
          <Popup
            longitude={selectedTask.longitude}
            latitude={selectedTask.latitude}
            anchor="top"
            onClose={() => setSelectedTask(null)}
            closeOnClick={false}
          >
            <div>{selectedTask.title}</div>
          </Popup>
        )}

        {hoveredTask && (
          <Popup
            longitude={hoveredTask.longitude}
            latitude={hoveredTask.latitude}
            anchor="top"
            closeButton={false}
            closeOnClick={false}
            offset={[0, -10]}
          >
            <div>{hoveredTask.task.title}</div>
          </Popup>
        )}
      </Map>
    </div>
  )
} 