'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@alfalab/core-components/button'
import { SidePanel } from '@alfalab/core-components/side-panel'
import styles from './pdf-share.module.css'

const PDF_URL = '/sample.pdf'
const PDF_NAME = 'sample.pdf'
const PDF_TITLE = 'Sample PDF'

type Status = { text: string; error?: boolean } | null

/**
 * ok        — можно шарить файлы (Android Chrome, iOS Safari, часть десктопов)
 * url-only  — share есть, но файлы шарить нельзя (шарим ссылку)
 * no-share  — Web Share API нет вообще (десктопный Firefox и т.п.)
 * insecure  — не secure context: на Android по http://192.168.x.x share не появится,
 *             нужен HTTPS или localhost (adb reverse)
 */
type ShareSupport = 'ok' | 'url-only' | 'no-share' | 'insecure'

function detectShareSupport(): ShareSupport {
  if (!window.isSecureContext) return 'insecure'
  if (typeof navigator.share !== 'function') return 'no-share'
  if (typeof navigator.canShare === 'function') {
    const probe = new File(['probe'], PDF_NAME, { type: 'application/pdf' })
    if (!navigator.canShare({ files: [probe] })) return 'url-only'
  }
  return 'ok'
}

export function PdfShare() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>(null)
  const [fileSize, setFileSize] = useState<number | null>(null)
  const [support, setSupport] = useState<ShareSupport>('ok')
  // Файл загружаем заранее при открытии панели: если делать fetch внутри onClick,
  // браузер может потерять user activation и заблокировать navigator.share
  const fileRef = useRef<File | null>(null)

  useEffect(() => {
    if (!open) return
    setSupport(detectShareSupport())
    if (fileRef.current) return
    fetch(PDF_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.blob()
      })
      .then((blob) => {
        fileRef.current = new File([blob], PDF_NAME, { type: 'application/pdf' })
        setFileSize(blob.size)
      })
      .catch(() => setStatus({ text: 'Не удалось загрузить PDF', error: true }))
  }, [open])

  const handleShare = useCallback(async () => {
    setStatus(null)
    try {
      if (support === 'url-only') {
        await navigator.share({ title: PDF_TITLE, url: new URL(PDF_URL, location.href).toString() })
        setStatus({ text: 'Ссылка на PDF отправлена' })
        return
      }

      let file = fileRef.current
      if (!file) {
        const blob = await fetch(PDF_URL).then((res) => res.blob())
        file = new File([blob], PDF_NAME, { type: 'application/pdf' })
        fileRef.current = file
      }

      await navigator.share({ files: [file], title: PDF_TITLE })
      setStatus({ text: 'PDF отправлен' })
    } catch (err) {
      // AbortError — пользователь сам закрыл системный диалог
      if (err instanceof DOMException && err.name === 'AbortError') return
      setStatus({
        text: `Ошибка шаринга: ${err instanceof Error ? err.message : String(err)}`,
        error: true,
      })
    }
  }, [support])

  // Фолбэк, когда share недоступен совсем
  const handleDownload = useCallback(() => {
    const a = document.createElement('a')
    a.href = PDF_URL
    a.download = PDF_NAME
    document.body.appendChild(a)
    a.click()
    a.remove()
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setStatus(null)
  }, [])

  const shareAvailable = support === 'ok' || support === 'url-only'

  return (
    <>
      <Button view="primary" size="s" onClick={() => setOpen(true)}>
        PDF
      </Button>

      <SidePanel open={open} onClose={handleClose}>
        <SidePanel.Header hasCloser title="Поделиться PDF" />

        <SidePanel.Content>
          <div className={styles.content}>
            <div className={styles.fileCard}>
              <div className={styles.fileIcon}>PDF</div>
              <div className={styles.fileMeta}>
                <a className={styles.fileName} href={PDF_URL} target="_blank" rel="noopener noreferrer">
                  {PDF_NAME}
                </a>
                <span className={styles.fileSize}>{fileSize ? `${(fileSize / 1024).toFixed(1)} КБ` : 'загрузка…'}</span>
              </div>
            </div>

            {support === 'ok' && (
              <p className={styles.hint}>
                Кнопка ниже откроет системный диалог «Поделиться» и передаст в него файл {PDF_NAME} через Web Share
                API.
              </p>
            )}

            {support === 'url-only' && (
              <p className={styles.hint}>
                Браузер не умеет шарить файлы через Web Share API, поэтому будет отправлена ссылка на PDF.
              </p>
            )}

            {support === 'no-share' && (
              <p className={styles.hint}>Web Share API недоступен в этом браузере — файл можно скачать.</p>
            )}

            {support === 'insecure' && (
              <div className={styles.warning}>
                <b>Share не заработает: страница открыта не в secure context.</b>
                <br />
                На Android открой её по HTTPS (<code>npm run start:https</code>) или как localhost через{' '}
                <code>adb reverse tcp:3000 tcp:3000</code> — по http://192.168.x.x браузер прячет navigator.share.
              </div>
            )}

            {status && (
              <p className={`${styles.status} ${status.error ? styles.statusError : ''}`}>{status.text}</p>
            )}
          </div>
        </SidePanel.Content>

        <SidePanel.Footer sticky>
          {shareAvailable ? (
            <Button view="primary" block onClick={handleShare}>
              Поделиться PDF
            </Button>
          ) : (
            <Button view="primary" block onClick={handleDownload}>
              Скачать PDF
            </Button>
          )}
        </SidePanel.Footer>
      </SidePanel>
    </>
  )
}
