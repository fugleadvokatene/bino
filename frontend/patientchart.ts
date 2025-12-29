import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns'

type Row = {
  Species: string
  Count: number
}

const makeChart = (dataID, canvasID) => {
  const el = document.getElementById(dataID)
  if (!el) {
    throw new Error(`missing ${dataID} data element`)
  }

  const rows: Row[] = JSON.parse(el.textContent || '{}')

  const labels = rows.map((p) => p.Species)
  const data = rows.map((p) => p.Count)

  const canvas = document.getElementById(canvasID) as HTMLCanvasElement
  if (!canvas) {
    throw new Error('missing chart canvas')
  }

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          data
        }
      ]
    },
    options: {
      animation: {
        duration: 0
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    },
    plugins: [
      {
        id: 'valueLabels',
        afterDatasetsDraw(chart) {
          const { ctx } = chart
          chart.getDatasetMeta(0).data.forEach((bar, i) => {
            ctx.save()
            ctx.textAlign = 'center'
            ctx.textBaseline = 'bottom'
            ctx.fillText(String(data[i]), bar.x, bar.y - 4)
            ctx.restore()
          })
        }
      }
    ]
  })
}

makeChart('patient-chart-data', 'patient-chart')
