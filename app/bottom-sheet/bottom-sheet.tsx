/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {Fragment, useState} from 'react';
import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Gap } from '@alfalab/core-components/gap';
import { SelectMobile } from '@alfalab/core-components/select/mobile';
import { BaseOption } from '@alfalab/core-components/select/shared';
import { CheckboxGroup } from '@alfalab/core-components/checkbox-group';
import { Switch } from '@alfalab/core-components/switch';
import { Typography } from '@alfalab/core-components/typography';
import { Link } from '@alfalab/core-components/link';
import { Collapse } from '@alfalab/core-components/collapse';
import { BottomSheet } from '@alfalab/core-components/bottom-sheet';

const Text = ({ onClose }: { onClose?(): void }) => (
    <>
        <Typography.Text tag='p'>
            В 2001 году в России начал действовать Федеральный закон №115 «О противодействии
            легализации доходов, полученных преступным путём, и финансированию терроризма». В рамках
            закона банки могут блокировать карты, отказывать в проведении сомнительных операций,
            ограничить доступ в интернет-банк или запрашивать документы, если по операции клиента
            возникли подозрения.{' '}
            <Link onClick={onClose}>Нажмите сюда, чтобы закрыть шторку без крестика</Link>
        </Typography.Text>
        <Collapse collapsedLabel='Подробнее' expandedLabel='Скрыть'>
            <Typography.Text tag='p'>
                Требования 115-ФЗ и связанных с ним документов Банка России часто меняются,
                предприниматели не всегда успевают за ними следить. Последствия нарушений
                «антиотмывочного» законодательства всегда неприятны: приходится остановить
                бизнес-процессы и доказать банку законность операций. Специалисты «Альфа-банка»
                собрали понятные рекомендации, как сэкономить время на объяснения и предотвратить
                блокировки
            </Typography.Text>
            <Typography.Text tag='p'>
                115-ФЗ Касается всех предпринимателей, фирм и физлиц, а также тех, кто пользуется
                банковским счётом для бизнеса, крупных денежных переводов или личных расчётов.
                Ограничения интернет-банка, блокировка карт добросовестных компаний могут произойти
                из-за неправильно оформленных документов, ошибок в платёжке или попыток снизить
                налоги.
            </Typography.Text>
            <br />
            <Typography.Text tag='p'>
                Клиенты воспринимают ограничения как атаку со стороны банка, но чаще всего сами
                допускают ошибки или нарушения, которых можно избежать. Банки не преследуют цели
                доставить неудобства клиентам — они обязаны соблюдать законодательство и следовать
                инструкциям и рекомендациям ЦБ, а в противном случае рискуют лишиться лицензии.
            </Typography.Text>
            <br />
            <Typography.Text tag='p'>
                Обналичивание — сомнительные операции, когда юрлицо или предприниматель снимает со
                счёта более 80% от оборота или переводит деньги на счета физлиц, которые затем
                снимают в наличной форме.
            </Typography.Text>
        </Collapse>
    </>
);

const HEADER_SELECT_OPTIONS = [
    { key: 'withoutTitle', content: 'Нет заголовка' },
    { key: 'defaultTitle', content: 'Стандартный' },
    { key: 'compactTitle', content: 'Компактный' },
    { key: 'compactTitleWithSubtitle', content: 'Компактный с подписью' },
    { key: 'compactTitleWithCenterAlign', content: 'Компактный центрированный' },
    {
        key: 'compactTitleWithSubtitleAndCenterAlign',
        content: 'Компактный центрированный с подписью',
    },
];

const FOOTER_SELECT_OPTIONS = [
    { key: 'vertical', content: 'Вертикальный' },
    { key: 'horizontal', content: 'Горизонтальный' },
];

const HEADER_SETTINGS = [
    { label: 'Крестик', name: 'hasCloser' },
    { label: 'Стрелка назад', name: 'hasBackButton' },
    { label: 'Фиксация шапки при скролле', name: 'sticky' },
];

const FOOTER_SETTINGS = [
    { label: 'Primary Button', name: 'hasPrimaryButton' },
    { label: 'Secondary Button', name: 'hasSecondaryButton' },
    { label: 'Фиксация футера при скролле', name: 'sticky' },
];

const MECHANICS_SETTINGS = [
    { label: 'Высота подстраивается под размер контента', name: 'adaptive' },
    { label: 'Разрешить закрывать свайпом', name: 'swipeable' },
];

export const BottomSheetComponent = () => {
    const [open, setOpen] = useState<any>(false);
    const [headerViewSelected, setHeaderView] = useState<any>(HEADER_SELECT_OPTIONS[0].key);
    const [footerViewSelected, setFooterView] = useState<any>(FOOTER_SELECT_OPTIONS[0].key);
    const [headerSettings, setHeaderSettings] = useState<any>(() => ({
        ...HEADER_SETTINGS.reduce((res, item) => ({ ...res, [item.name]: false }), {}),
        titleInContent: false,
    }));
    const [footerSettings, setFooterSettings] = useState<any>(() =>
        FOOTER_SETTINGS.reduce((res, item) => ({ ...res, [item.name]: false }), {}),
    );
    const [mechanics, setMechanics] = useState<any>(() =>
        MECHANICS_SETTINGS.reduce((res, item) => ({ ...res, [item.name]: false }), {}),
    );

    const showHeader =
        headerViewSelected !== HEADER_SELECT_OPTIONS[0].key ||
        headerSettings.hasCloser ||
        headerSettings.hasBackButton;

    const showFooter = footerSettings.hasPrimaryButton || footerSettings.hasSecondaryButton;

    const getKey = () =>
        `${JSON.stringify({
            ...headerSettings,
            ...mechanics,
            ...footerSettings,
        })}-${headerViewSelected}-${footerViewSelected}`;

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleHeaderSettingsChange = (_: any, { name, checked }: any) => {
        setHeaderSettings((prevState: any) => ({ ...prevState, [name]: checked }));
    };

    const handleFooterSettingsChange = (_: any, { name, checked }: any) => {
        setFooterSettings((prevState: any) => ({ ...prevState, [name]: checked }));
    };

    const handleMechanicsChange = (_: any, { name, checked }: any) => {
        setMechanics((prevState: any) => ({ ...prevState, [name]: checked }));
    };

    return (
        <Fragment>
            <ButtonMobile size='s' onClick={handleOpen} block={true}>
                Показать шторку
            </ButtonMobile>

            <Gap size='2xl' />

            <p style={{ margin: '0 0 var(--gap-12) 0' }}>Настройки шапки</p>

            <SelectMobile
                block={true}
                options={HEADER_SELECT_OPTIONS}
                label='Заголовок'
                selected={headerViewSelected}
                onChange={({ selected }: any) => setHeaderView(selected.key)}
                Option={BaseOption}
            />

            <Gap size='m' />

            <CheckboxGroup onChange={handleHeaderSettingsChange}>
                {HEADER_SETTINGS.map((item) => (
                    <Switch
                        key={item.name}
                        label={item.label}
                        name={item.name}
                        checked={headerSettings[item.name]}
                    />
                ))}
            </CheckboxGroup>

            <Gap size='2xl' />

            <CheckboxGroup
                label='Примеры наполнения контентной части'
                onChange={handleHeaderSettingsChange}
            >
                <Switch
                    label='Заголовок в контентной области'
                    name='titleInContent'
                    checked={headerSettings.titleInContent}
                />
            </CheckboxGroup>

            <Gap size='2xl' />

            <p style={{ margin: '0 0 var(--gap-12) 0' }}>Настройки футера</p>

            <SelectMobile
                block={true}
                options={FOOTER_SELECT_OPTIONS}
                label='Лейаут'
                selected={footerViewSelected}
                onChange={({ selected }: any) => setFooterView(selected.key)}
                Option={BaseOption}
            />

            <Gap size='m' />

            <CheckboxGroup label='Настройки футера' onChange={handleFooterSettingsChange}>
                {FOOTER_SETTINGS.map((item) => (
                    <Switch
                        key={item.name}
                        label={item.label}
                        name={item.name}
                        checked={footerSettings[item.name]}
                    />
                ))}
            </CheckboxGroup>

            <Gap size='2xl' />

            <CheckboxGroup label='Механики' onChange={handleMechanicsChange}>
                {MECHANICS_SETTINGS.map((item) => (
                    <Switch
                        key={item.name}
                        label={item.label}
                        name={item.name}
                        checked={mechanics[item.name]}
                    />
                ))}
            </CheckboxGroup>

            <BottomSheet
                open={open}
                onClose={handleClose}
                key={getKey()}
                title={
                    showHeader
                        ? [
                            'defaultTitle',
                            'compactTitle',
                            'compactTitleWithSubtitle',
                            'compactTitleWithCenterAlign',
                            'compactTitleWithSubtitleAndCenterAlign',
                        ].includes(headerViewSelected)
                            ? 'Почему банк проверяет мои операции?'
                            : undefined
                        : undefined
                }
                hasCloser={headerSettings.hasCloser}
                hasBacker={headerSettings.hasBackButton}
                stickyHeader={headerSettings.sticky}
                titleAlign={
                    [
                        'compactTitleWithCenterAlign',
                        'compactTitleWithSubtitleAndCenterAlign',
                    ].includes(headerViewSelected)
                        ? 'center'
                        : undefined
                }
                titleSize={
                    [
                        'compactTitle',
                        'compactTitleWithSubtitle',
                        'compactTitleWithCenterAlign',
                        'compactTitleWithSubtitleAndCenterAlign',
                    ].includes(headerViewSelected)
                        ? 'compact'
                        : undefined
                }
                subtitle={
                    ['compactTitleWithSubtitle', 'compactTitleWithSubtitleAndCenterAlign'].includes(
                        headerViewSelected,
                    )
                        ? 'Почему банк проверяет мои операции?'
                        : undefined
                }
                stickyFooter={footerSettings.sticky}
                swipeable={mechanics.swipeable}
                initialHeight={mechanics.adaptive ? 'default' : 'full'}
                actionButton={
                    showFooter ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection:
                                    footerViewSelected === 'vertical' ? 'column-reverse' : 'row',
                            }}
                        >
                            {footerSettings.hasSecondaryButton && (
                                <ButtonMobile
                                    view='secondary'
                                    size='m'
                                    onClick={handleClose}
                                    block={true}
                                >
                                    Secondary
                                </ButtonMobile>
                            )}

                            {footerSettings.hasPrimaryButton &&
                            footerSettings.hasSecondaryButton ? (
                                <Gap size='m' direction={footerViewSelected} />
                            ) : null}

                            {footerSettings.hasPrimaryButton && (
                                <ButtonMobile
                                    view='primary'
                                    size='m'
                                    onClick={handleClose}
                                    block={true}
                                >
                                    Primary
                                </ButtonMobile>
                            )}
                        </div>
                    ) : undefined
                }
            >
                {headerSettings.titleInContent ? (
                    <>
                        <Typography.Title view='xsmall' tag='div' font='system'>
                            {`Почему банк проверяет мои операции?`}
                        </Typography.Title>
                        <Gap size='m' />
                    </>
                ) : undefined}

                <Text onClose={handleClose} />
            </BottomSheet>
        </Fragment>
    );
}