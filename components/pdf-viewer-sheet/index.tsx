'use client';

import { useEffect, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { BottomSheet } from '@alfalab/core-components/bottom-sheet';

import styles from './pdf-viewer-sheet.module.css';

const PDF_TITLE = 'PDF Document multi';
const PDF_FILE_NAME = 'PDF Document multi2.pdf';
const PDF_PATH = '/PDF%20Document%20multi2.pdf';
const PDF_EMBED_PATH = `${PDF_PATH}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

type ShareNavigator = Navigator & {
  canShare?: (data: ShareData) => boolean;
};

export function PdfViewerSheet() {
  const [open, setOpen] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareStatus, setShareStatus] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    if (!open || pdfFile) {
      return;
    }

    let ignore = false;

    const preparePdfFile = async () => {
      try {
        const response = await fetch(PDF_PATH);
        const blob = await response.blob();

        if (!ignore) {
          setPdfFile(new File([blob], PDF_FILE_NAME, { type: 'application/pdf' }));
        }
      } catch {
        if (!ignore) {
          setPdfFile(null);
        }
      }
    };

    preparePdfFile();

    return () => {
      ignore = true;
    };
  }, [open, pdfFile]);

  const handleClose = () => {
    setOpen(false);
    setShareStatus('');
  };

  const stopSheetDrag = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  const downloadPdf = (documentUrl: string) => {
    const link = document.createElement('a');

    link.href = documentUrl;
    link.download = PDF_FILE_NAME;
    link.rel = 'noopener';
    document.body.append(link);
    link.click();
    link.remove();
    setShareStatus('Download started');
  };

  const handleShare = async () => {
    const documentUrl = new URL(PDF_PATH, window.location.href).toString();
    const shareNavigator = window.navigator as ShareNavigator;

    setSharing(true);
    setShareStatus('');

    try {
      if (shareNavigator.share) {
        if (pdfFile) {
          const fileShareData: ShareData = {
            title: PDF_TITLE,
            files: [pdfFile],
          };

          if (shareNavigator.canShare?.(fileShareData)) {
            await shareNavigator.share(fileShareData);
            return;
          }
        }

        await shareNavigator.share({
          title: PDF_TITLE,
          url: documentUrl,
        });
        return;
      }

      downloadPdf(documentUrl);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      downloadPdf(documentUrl);
    } finally {
      setSharing(false);
    }
  };

  return (
    <>
      <button className={styles.viewButton} type="button" onClick={() => setOpen(true)}>
        View pdf
      </button>

      <BottomSheet
        open={open}
        onClose={handleClose}
        initialHeight="full"
        swipeable={false}
        hasCloser={false}
      >
        <section className={styles.sheet} aria-label={PDF_TITLE}>
          <div className={styles.toolbar}>
            <button className={styles.textButton} type="button" onClick={handleClose}>
              Закрыть
            </button>
            <h1 className={styles.title}>{PDF_TITLE}</h1>
            <button
              className={styles.iconButton}
              type="button"
              onClick={handleShare}
              disabled={sharing}
              aria-label="Share PDF"
            >
              <span className={styles.shareIcon} aria-hidden="true" />
            </button>
          </div>

          <div
            className={styles.frameWrap}
            onPointerDown={stopSheetDrag}
            onPointerMove={stopSheetDrag}
            onTouchStart={stopSheetDrag}
            onTouchMove={stopSheetDrag}
          >
            <embed
              className={styles.frame}
              src={PDF_EMBED_PATH}
              type="application/pdf"
              title={PDF_TITLE}
            />
          </div>

          {shareStatus ? <p className={styles.shareStatus}>{shareStatus}</p> : null}
        </section>
      </BottomSheet>
    </>
  );
}
