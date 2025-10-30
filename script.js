document.addEventListener('DOMContentLoaded', () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const cssVar = (token) => rootStyles.getPropertyValue(token).trim();

  const withOpacity = (color, alpha) => {
    if (!color) return `rgba(37, 99, 235, ${alpha})`;
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const expand = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
      const r = parseInt(expand.slice(0, 2), 16);
      const g = parseInt(expand.slice(2, 4), 16);
      const b = parseInt(expand.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    if (color.startsWith('rgb')) {
      const parts = color.replace(/rgba?\(|\)|\s/g, '').split(',');
      const [r, g, b] = parts;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return color;
  };

  const brandPalette = {
    franchise: cssVar('--accent') || '#2563eb',
    franchiseStrong: cssVar('--accent-strong') || '#1d4ed8',
    standalone: cssVar('--accent-soft') || '#93a4ff',
    textPrimary: cssVar('--text-primary') || '#0f172a',
    textSecondary: cssVar('--text-secondary') || '#475569',
    neutral: cssVar('--border') || 'rgba(148, 163, 184, 0.28)'
  };

  Chart.defaults.font.family = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  Chart.defaults.font.size = 13;
  Chart.defaults.color = brandPalette.textSecondary;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.padding = 20;
  Chart.defaults.plugins.legend.labels.boxWidth = 14;
  Chart.defaults.plugins.legend.labels.boxHeight = 14;
  Chart.defaults.plugins.legend.align = 'start';
  Chart.defaults.plugins.legend.position = 'top';

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
            hoverBackgroundColor: brandPalette.franchiseStrong,
            borderRadius: 12,
            borderSkipped: false,
            barPercentage: 0.65,
            categoryPercentage: 0.6,
            maxBarThickness: 42
          },
          {
            label: 'Standalone',
            data: [132, 186, 205, 214],
            backgroundColor: brandPalette.standalone,
            hoverBackgroundColor: withOpacity(brandPalette.standalone, 0.85),
            borderRadius: 12,
            borderSkipped: false,
            barPercentage: 0.65,
            categoryPercentage: 0.6,
            maxBarThickness: 42
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 22,
            right: 24,
            bottom: 18,
            left: 18
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: brandPalette.neutral
            },
            ticks: {
              color: '#475569',
              font: { weight: '500' },
              callback: (value) => `$${value}M`
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#64748b',
              font: { weight: '500' }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: brandPalette.textPrimary,
              font: { weight: '600' }
            }
          },
          tooltip: {
            padding: 12,
            backgroundColor: '#ffffff',
            titleColor: brandPalette.textPrimary,
            bodyColor: brandPalette.textPrimary,
            titleFont: { weight: '600' },
            boxPadding: 4,
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
            backgroundColor: withOpacity(brandPalette.franchise, 0.12),
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 6,
            pointBackgroundColor: brandPalette.franchise,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
          },
          {
            label: 'Standalone ROI',
            data: [1.5, 3.9, 4.2, 4.7, 5.1],
            borderColor: brandPalette.standalone,
            backgroundColor: withOpacity(brandPalette.standalone, 0.22),
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 6,
            pointBackgroundColor: brandPalette.standalone,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 18,
            right: 24,
            bottom: 12,
            left: 18
          }
        },
        scales: {
          y: {
            grid: {
              color: brandPalette.neutral,
              drawBorder: false
            },
            ticks: {
              color: '#475569',
              font: { weight: '500' },
              callback: (value) => `${value.toFixed(1)}x`
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#64748b',
              font: { weight: '500' }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: brandPalette.textPrimary,
              font: { weight: '600' }
            }
          },
          tooltip: {
            padding: 12,
            backgroundColor: '#ffffff',
            titleColor: brandPalette.textPrimary,
            bodyColor: brandPalette.textPrimary,
            titleFont: { weight: '600' },
            boxPadding: 4,
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
            backgroundColor: withOpacity(brandPalette.franchise, 0.17),
            borderColor: brandPalette.franchise,
            borderWidth: 2.2,
            pointRadius: 4.5,
            pointHoverRadius: 6,
            pointBackgroundColor: brandPalette.franchise,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 1.5
          },
          {
            label: 'Standalone Fans',
            data: [74, 63, 49, 61, 58],
            backgroundColor: withOpacity(brandPalette.standalone, 0.18),
            borderColor: brandPalette.standalone,
            borderWidth: 2.2,
            pointRadius: 4.5,
            pointHoverRadius: 6,
            pointBackgroundColor: brandPalette.standalone,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 1.5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 12,
            right: 12,
            bottom: 12,
            left: 12
          }
        },
        scales: {
          r: {
            angleLines: {
              color: brandPalette.neutral,
              lineWidth: 1
            },
            grid: {
              color: brandPalette.neutral,
              lineWidth: 1
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              display: false,
              backdropColor: 'transparent'
            },
            pointLabels: {
              color: '#475569',
              font: { size: 12, weight: '500' }
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: brandPalette.textPrimary,
              font: { weight: '600' }
            }
          },
          tooltip: {
            padding: 12,
            backgroundColor: '#ffffff',
            titleColor: brandPalette.textPrimary,
            bodyColor: brandPalette.textPrimary,
            titleFont: { weight: '600' },
            boxPadding: 4,
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.parsed.r}`
            }
          }
        }
      }
    });
  }
});
