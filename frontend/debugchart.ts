import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns'

type Point = {
  x: string
  y: number
}

type Series = {
  Name: string
  Values: Point[]
}

const makeChart = (dataID, canvasID) => {
  const el = document.getElementById(dataID)
  if (!el) {
    throw new Error(`missing ${dataID} data element`)
  }

  const series: Series = JSON.parse(el.textContent || '{}')

  const points = series.Values.map((p) => ({
    x: new Date(p.x),
    y: p.y
  }))

  const xs = points.map((p) => p.x.getTime())

  const canvas = document.getElementById(canvasID) as HTMLCanvasElement
  if (!canvas) {
    throw new Error('missing chart canvas')
  }

  new Chart(canvas, {
    type: 'line',
    data: {
      datasets: [
        {
          label: series.Name,
          data: points,
          tension: 0.15,
          borderWidth: 2,
          pointRadius: 2
        }
      ]
    },
    options: {
      parsing: false,
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          type: 'time',
          min: Math.min(...xs),
          max: Math.max(...xs),
          grid: {
            display: false
          },
          ticks: {
            maxRotation: 0
          }
        },
        y: {
          beginAtZero: true,
          min: 0,
          grace: 0,
          grid: {
            color: 'rgba(0,0,0,0.05)'
          }
        }
      }
    }
  })
}

makeChart('ProcNGoroutines-data', 'ProcNGoroutines-chart')
makeChart('ProcMemAllocatedMB-data', 'ProcMemAllocatedMB-chart')
makeChart('MachineLoadPercent-data', 'MachineLoadPercent-chart')
makeChart('MachineMemUsedMB-data', 'MachineMemUsedMB-chart')
makeChart('MachineDiskUsedGB-data', 'MachineDiskUsedGB-chart')
