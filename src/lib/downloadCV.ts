import { CV_URL, CV_FILENAME } from '../data'

export function downloadCV(): void {
  const link = document.createElement('a')
  link.href = CV_URL
  link.download = CV_FILENAME
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
