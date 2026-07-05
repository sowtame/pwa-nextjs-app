'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

type LaunchStatus = 'idle' | 'trying' | 'left-page' | 'no-handler'

function useDisplayMode() {
  const [mode, setMode] = useState<string>('…')

  useEffect(() => {
    const query = window.matchMedia('(display-mode: standalone)')
    const update = () => {
      // navigator.standalone — legacy-флаг iOS Safari, дублирует media query
      const iosStandalone = (navigator as { standalone?: boolean }).standalone
      setMode(query.matches || iosStandalone ? 'standalone (web app)' : 'browser tab')
    }
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return mode
}

export default function WebAppSchemePage() {
  const displayMode = useDisplayMode()
  const [targetUrl, setTargetUrl] = useState('')
  const [status, setStatus] = useState<LaunchStatus>('idle')
  const [copied, setCopied] = useState(false)
  const [shortcutName, setShortcutName] = useState('OpenPWA')
  const [shortcutCopied, setShortcutCopied] = useState(false)

  useEffect(() => {
    // На iPhone страницу открывают по LAN-адресу (http://192.168.x.x:3000),
    // поэтому базу берём из текущего origin, а не хардкодим localhost
    setTargetUrl(window.location.origin + '/')
  }, [])

  const webappUrl = useMemo(() => (targetUrl ? `webapp://${targetUrl}` : ''), [targetUrl])

  const runShortcutUrl = useMemo(() => {
    if (!webappUrl || !shortcutName) return ''
    return `shortcuts://run-shortcut?name=${encodeURIComponent(shortcutName)}&input=text&text=${encodeURIComponent(webappUrl)}`
  }, [webappUrl, shortcutName])

  const tryOpen = () => {
    setStatus('trying')
    const startedAt = Date.now()

    const onHide = () => {
      setStatus('left-page')
      document.removeEventListener('visibilitychange', onHide)
    }
    document.addEventListener('visibilitychange', onHide)

    // Если через 2с страница всё ещё видима — схему никто не обработал
    setTimeout(() => {
      document.removeEventListener('visibilitychange', onHide)
      if (document.visibilityState === 'visible' && Date.now() - startedAt >= 2000) {
        setStatus((prev) => (prev === 'left-page' ? prev : 'no-handler'))
      }
    }, 2000)

    window.location.href = webappUrl
  }

  const copyText = async (text: string, setFlag: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text)
      setFlag(true)
      setTimeout(() => setFlag(false), 1500)
    } catch {
      window.prompt('Скопируйте вручную:', text)
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>webapp:// launcher</h1>

        <section className={styles.card}>
          <div className={styles.row}>
            <span className={styles.label}>Режим отображения сейчас</span>
            <code className={styles.value}>{displayMode}</code>
          </div>
          <p className={styles.hint}>
            Если PWA открылось через <code>webapp://</code>, здесь должно быть <code>standalone (web app)</code>.
          </p>
        </section>

        <section className={styles.card}>
          <label className={styles.label} htmlFor="target-url">
            URL, с которым PWA добавлено на экран «Домой»
          </label>
          <input
            id="target-url"
            className={styles.input}
            type="url"
            value={targetUrl}
            onChange={(e) => {
              setTargetUrl(e.target.value)
              setStatus('idle')
            }}
            placeholder="https://your-pwa-domain.com/"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <div className={styles.row}>
            <span className={styles.label}>Итоговая ссылка</span>
            <code className={styles.value}>{webappUrl || '…'}</code>
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryBtn} onClick={tryOpen} disabled={!webappUrl}>
              Открыть webapp://
            </button>
            <button
              className={styles.secondaryBtn}
              onClick={() => copyText(webappUrl, setCopied)}
              disabled={!webappUrl}
            >
              {copied ? 'Скопировано ✓' : 'Скопировать для Shortcuts'}
            </button>
            <a className={styles.secondaryBtn} href="shortcuts://create-shortcut">
              Открыть Быстрые команды
            </a>
          </div>

          {status === 'trying' && <p className={styles.hint}>Пробуем открыть…</p>}
          {status === 'left-page' && (
            <p className={styles.hintOk}>Страница ушла в фон — похоже, система обработала схему.</p>
          )}
          {status === 'no-handler' && (
            <p className={styles.hintFail}>
              Ничего не произошло: прямой переход по <code>webapp://</code> из браузера не обработан. Это ожидаемо —
              схема работает через Shortcuts (см. инструкцию ниже).
            </p>
          )}
        </section>

        <section className={styles.card}>
          <h2 className={styles.subtitle}>Запуск из браузера через Shortcuts</h2>
          <p className={styles.hint}>
            Прямой переход по <code>webapp://</code> из Safari не работает, но можно открыть PWA цепочкой: ссылка{' '}
            <code>shortcuts://run-shortcut</code> → команда в Shortcuts → <code>webapp://</code>. Команда с именем ниже
            должна быть заранее создана на устройстве: блок «Получить входные данные» (Get Shortcut Input) → блок
            «Открыть URL-адреса» (Open URLs).
          </p>
          <label className={styles.label} htmlFor="shortcut-name">
            Имя команды в Shortcuts
          </label>
          <input
            id="shortcut-name"
            className={styles.input}
            type="text"
            value={shortcutName}
            onChange={(e) => setShortcutName(e.target.value)}
            placeholder="OpenPWA"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <div className={styles.row}>
            <span className={styles.label}>Итоговая ссылка</span>
            <code className={styles.value}>{runShortcutUrl || '…'}</code>
          </div>
          <div className={styles.actions}>
            <a
              className={runShortcutUrl ? styles.primaryBtn : `${styles.primaryBtn} ${styles.disabledLink}`}
              href={runShortcutUrl || undefined}
            >
              Запустить через Shortcuts
            </a>
            <button
              className={styles.secondaryBtn}
              onClick={() => copyText(runShortcutUrl, setShortcutCopied)}
              disabled={!runShortcutUrl}
            >
              {shortcutCopied ? 'Скопировано ✓' : 'Скопировать ссылку'}
            </button>
          </div>
          <p className={styles.hint}>
            Safari покажет диалог «Открыть в „Быстрые команды“?» — это обязательный шаг, молча перейти нельзя.
          </p>
        </section>

        <section className={styles.card}>
          <h2 className={styles.subtitle}>Как проверить (iOS/iPadOS 26)</h2>
          <ol className={styles.steps}>
            <li>
              Откройте этот сайт в Safari на iPhone по адресу из локальной сети (например,{' '}
              <code>http://192.168.x.x:3000</code>) и добавьте на экран «Домой» с включённым «Open as Web App».
            </li>
            <li>Запустите PWA с иконки один раз, затем закройте его.</li>
            <li>
              В приложении «Быстрые команды»: новая команда → действие «URL» со значением из поля выше → действие
              «Открыть URL-адреса».
            </li>
            <li>Запустите команду: PWA должно открыться в standalone-режиме, а не во вкладке Safari.</li>
            <li>
              Вернитесь на эту страницу внутри PWA (<code>/webapp</code>) — «Режим отображения» покажет{' '}
              <code>standalone (web app)</code>.
            </li>
          </ol>
          <p className={styles.hint}>
            URL после <code>webapp://</code> должен точно совпадать с адресом, с которого PWA добавляли на «Домой»
            (протокол, хост, порт, путь).
          </p>
        </section>

        <Link className={styles.backLink} href="/">
          ← На главную
        </Link>
      </main>
    </div>
  )
}
