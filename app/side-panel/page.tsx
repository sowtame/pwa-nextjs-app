'use client';

import Link from 'next/link';
import { PortalContext } from '@alfalab/core-components/shared';
import { Gap } from '@alfalab/core-components/gap';

import { SidePanel } from './side-panel';

import styles from '../page.module.css';

export default function PageWithSidePanel() {
  return (
    <div>
      <PortalContext.Provider value={() => document.querySelector('#portal')}>
        <SidePanel />
      </PortalContext.Provider>
      <Gap size="m" />
      <Link className={styles.secondary} href={'/'}>
        Home page
      </Link>
    </div>
  );
}
