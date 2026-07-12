export function exportToCSV(data, columns, filename = 'export') {
  if (!data || data.length === 0) return
  const header = columns.map((c) => `"${c.label}"`).join(',')
  const rows = data.map((item) =>
    columns.map((c) => {
      const val = item[c.key]
      const str = val != null ? String(val) : ''
      return `"${str.replace(/"/g, '""')}"`
    }).join(',')
  )
  const csv = [header, ...rows].join('\n')
  const bom = '\uFEFF'
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function exportToPDF(title, metadata, data, columns, filename = 'export') {
  if (!data || data.length === 0) return

  const metaRows = metadata
    ? metadata.map((m) => `<tr><td style="font-weight:700;padding:4px 8px;border:none;color:#334155;">${m.label}</td><td style="padding:4px 8px;border:none;color:#0f172a;">${m.value}</td></tr>`).join('')
    : ''

  const headerRow = columns.map((c) => `<th style="background:#f8fafc;border-bottom:2px solid #cbd5e1;padding:10px 14px;font-size:11px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;text-align:left;">${c.label}</th>`).join('')

  const dataRows = data
    .map((item) => {
      const cells = columns
        .map((c) => {
          const val = item[c.key]
          const str = val != null ? String(val) : ''
          return `<td style="border-bottom:1px solid #f1f5f9;padding:10px 14px;font-size:12px;color:#334155;">${str}</td>`
        })
        .join('')
      return `<tr>${cells}</tr>`
    })
    .join('')

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>${title}</title>
      <style>
        body { font-family: 'Inter', -apple-system, sans-serif; padding: 32px; color: #0f172a; }
        h1 { font-size: 22px; font-weight: 800; margin: 0 0 4px 0; color: #0f172a; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        hr { border: none; border-top: 1px solid #e2e8f0; margin: 12px 0; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      ${metadata ? `<table style="width:auto;margin-top:8px;">${metaRows}</table><hr />` : ''}
      <table>${headerRow ? `<thead><tr>${headerRow}</tr></thead>` : ''}<tbody>${dataRows}</tbody></table>
      <script>
        window.onload = function() { window.print(); window.onafterprint = function() { window.close(); }; }
      <\/script>
    </body>
    </html>
  `

  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(html)
  win.document.close()
}

export function exportToExcel(data, columns, filename = 'export') {
  if (!data || data.length === 0) return

  const headerRow = columns.map((c) => `<th style="background:#f8fafc;border-bottom:2px solid #cbd5e1;padding:8px 12px;font-weight:700;color:#475569;">${c.label}</th>`).join('')

  const dataRows = data
    .map((item) => {
      const cells = columns
        .map((c) => {
          const val = item[c.key]
          const str = val != null ? String(val) : ''
          return `<td style="border-bottom:1px solid #f1f5f9;padding:8px 12px;">${str}</td>`
        })
        .join('')
      return `<tr>${cells}</tr>`
    })
    .join('')

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Sheet1</x:Name></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>
    <body><table>${headerRow ? `<thead><tr>${headerRow}</tr></thead>` : ''}<tbody>${dataRows}</tbody></table></body>
    </html>
  `

  const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.xls`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
