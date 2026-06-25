import React, {useState} from 'react';
import { DiamondsMIcon } from '@alfalab/icons-glyph/DiamondsMIcon';
import { Typography } from '@alfalab/core-components/typography';
import { Switch } from '@alfalab/core-components/switch';
import { Gap } from '@alfalab/core-components/gap';
import { Radio } from '@alfalab/core-components/radio';
import { RadioGroup } from '@alfalab/core-components/radio-group';
import { TabBar as TabBarCore, TabBarProps } from '@alfalab/core-components/tab-bar';

import styles from './index.module.css';

const INDICATOR_OPTIONS = [
    { showIndicator: false, label: 'Без индикатора' },
    { showIndicator: true, label: 'Индикатор без значения' },
    {
        showIndicator: true,
        indicatorProps: { value: 7 },
        label: '7 уведомлений',
    },
    {
        showIndicator: true,
        indicatorProps: { value: 100 },
        label: '99+ уведомлений',
    },
];


export const TabBar = () => {
    const [selectedId, setSelectedId] = useState('Tab1');
    const [accentColor, setAccentColor] = useState<TabBarProps['accentColor']>('primary');
    const [bgColor, setBgColor] = useState<TabBarProps['bgColor']>('modal-bg-primary');
    const [optionId, setOptionId] = useState('0');
    const [textOverflow, setTextOverflow] = useState(false);

    return <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}
    >
        <div>
            <Typography.Text tag='p' style={{textAlign: 'center'}}>
                {selectedId}
            </Typography.Text>

            <Gap size='s'/>

            <Switch
                label='Длинное название таба'
                checked={textOverflow}
                onChange={() => setTextOverflow((p) => !p)}
            />

            <Gap size='xl'/>

            <RadioGroup
                onChange={(_, {value}) => setOptionId(value)}
                value={optionId}
                label='Индикатор'
            >
                {INDICATOR_OPTIONS.map((option, idx) => (
                    <Radio size='m' value={String(idx)} label={option.label} key={idx}/>
                ))}
            </RadioGroup>

            <Gap size='xl'/>

            <RadioGroup
                onChange={(_, {value}) => setAccentColor(value as TabBarProps['accentColor'])}
                value={accentColor}
                label='Цвет активного таба'
            >
                <Radio label='Accent-primary' value='primary' size='m'/>
                <Radio label='Accent-secondary' value='secondary' size='m'/>
            </RadioGroup>

            <Gap size='xl'/>

            <RadioGroup
                onChange={(_, {value}) => setBgColor(value as TabBarProps['bgColor'])}
                value={bgColor}
                label='Цвет подложки'
            >
                <Radio label='Modal-bg-primary' value='modal-bg-primary' size='m'/>
                <Radio label='Modal-bg-alt-primary' value='modal-bg-alt-primary' size='m'/>
            </RadioGroup>
            <Gap size='l'/>
        </div>

        <TabBarCore
            bgColor={bgColor}
            accentColor={accentColor}
            selectedId={selectedId}
            onChange={setSelectedId}
            border={true}
            className={styles.tabBarCore}
        >
            {Array(5)
                .fill(null)
                .map((_, idx) => {
                    return (
                        <TabBarCore.Tab
                            {...(idx === 0 ? INDICATOR_OPTIONS[Number(optionId)] : null)}
                            key={idx}
                            id={`Tab${idx + 1}`}
                            icon={<DiamondsMIcon/>}
                            label={`TabName${idx + 1}`}
                            {...(idx === 0 && textOverflow
                                ? {label: 'LongTabName1'}
                                : null)}
                        />
                    );
                })}
        </TabBarCore>
    </div>
}