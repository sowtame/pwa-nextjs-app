'use client';

import Link from 'next/link';
import cn from "classnames";
import { Gap } from '@alfalab/core-components/gap';
import {TabBar} from "./tab-bar";

import styles from '../page.module.css';
import pageStyles from './index.module.css';

export default function PageWithTabBar() {
    return (
        <div className={cn(styles.pagePadding, pageStyles.container)}>
            <Link className={styles.secondary} href={'/'}>
                Home page
            </Link>

            <Gap size="m" />

            <TabBar />
        </div>
    );
}
