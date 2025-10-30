document.addEventListener('DOMContentLoaded', () => {
  const brandPalette = {
    franchise: '#5eead4',
    standalone: '#38bdf8',
    dark: '#1f2937',
    neutral: 'rgba(148, 163, 184, 0.5)'
  };

  const lifetimeCtx = document.getElementById('lifetimeValueChart');
  if (lifetimeCtx) {
    new Chart(lifetimeCtx, {
      type: 'bar',
      data: {
        labels: ['Opening', 'Year 1', 'Year 2', 'Year 3'],
        datasets: [
          {
            label: 'Franchise',
            data: [180, 268, 312, 355],
            backgroundColor: brandPalette.franchise,
            borderRadius: 12,
            barPercentage: 0.7
          },
          {
            label: 'Standalone',
            data: [132, 186, 205, 214],
            backgroundColor: brandPalette.standalone,
            borderRadius: 12,
            barPercentage: 0.7
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: brandPalette.neutral
            },
            ticks: {
              color: '#e2e8f0',
              callback: (value) => `$${value}M`
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#cbd5f5'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#f8fafc',
              font: { weight: '600' },
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: $${context.parsed.y}M`
            }
          }
        }
      }
    });
  }

  const capitalCtx = document.getElementById('capitalEfficiencyChart');
  if (capitalCtx) {
    new Chart(capitalCtx, {
      type: 'line',
      data: {
        labels: ['Production', 'Marketing', 'Licensing', 'Streaming', 'Ancillary'],
        datasets: [
          {
            label: 'Franchise ROI',
            data: [1.8, 4.8, 5.6, 6.3, 7.1],
            borderColor: brandPalette.franchise,
            backgroundColor: 'rgba(94, 234, 212, 0.12)',
            fill: true,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: brandPalette.franchise
          },
          {
            label: 'Standalone ROI',
            data: [1.5, 3.9, 4.2, 4.7, 5.1],
            borderColor: brandPalette.standalone,
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            fill: true,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: brandPalette.standalone
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            grid: {
              color: brandPalette.neutral
            },
            ticks: {
              color: '#e2e8f0',
              callback: (value) => `${value.toFixed(1)}x`
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#cbd5f5'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#f8fafc',
              font: { weight: '600' },
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(1)}x`
            }
          }
        }
      }
    });
  }

  const audienceCtx = document.getElementById('audienceFlywheelChart');
  if (audienceCtx) {
    new Chart(audienceCtx, {
      type: 'radar',
      data: {
        labels: ['Net Promoter Score', 'Repeat Attendance', 'Merchandise Spend', 'Social Mentions', 'Streaming Completion'],
        datasets: [
          {
            label: 'Franchise Fans',
            data: [92, 84, 76, 88, 81],
            backgroundColor: 'rgba(94, 234, 212, 0.2)',
            borderColor: brandPalette.franchise,
            borderWidth: 2,
            pointBackgroundColor: brandPalette.franchise
          },
          {
            label: 'Standalone Fans',
            data: [74, 63, 49, 61, 58],
            backgroundColor: 'rgba(56, 189, 248, 0.18)',
            borderColor: brandPalette.standalone,
            borderWidth: 2,
            pointBackgroundColor: brandPalette.standalone
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: brandPalette.neutral
            },
            grid: {
              color: brandPalette.neutral
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              display: false
            },
            pointLabels: {
              color: '#cbd5f5',
              font: { size: 12 }
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#f8fafc',
              font: { weight: '600' },
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.parsed.r}`
            }
          }
        }
      }
    });
  }
});
