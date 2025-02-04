'use client'

import Link from "next/link";
import { PortalContext } from '@alfalab/core-components/shared';
import { Gap } from '@alfalab/core-components/gap';

import {Modal} from './modal'

import styles from "@/app/page.module.css";

export default function PageWithModal() {
    return (
        <PortalContext.Provider value={() => document.querySelector('#portal')}>
            <div className={styles.pagePadding}>
                <Modal/>

                <Gap size="m" />
                <Link className={styles.secondary} href={'/'}>
                    Home page
                </Link>
            </div>
        </PortalContext.Provider>
    );
}