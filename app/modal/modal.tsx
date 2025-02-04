/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {Fragment, useState} from 'react';
import { Button } from '@alfalab/core-components/button';
import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Gap } from '@alfalab/core-components/gap';
import { SelectMobile } from '@alfalab/core-components/select/mobile';
import { BaseOption } from '@alfalab/core-components/select/shared';
import { CheckboxGroup } from '@alfalab/core-components/checkbox-group';
import { Switch } from '@alfalab/core-components/switch';
import { ModalMobile } from '@alfalab/core-components/modal/mobile';
import { Typography } from '@alfalab/core-components/typography';
import { Link } from '@alfalab/core-components/link';
import { Collapse } from '@alfalab/core-components/collapse';

const Text = ({ onClose }: { onClose?(): void }) => (
    <>
        <Typography.Text tag='p'>
            В 2001 году в России начал действовать Федеральный закон №115 «О противодействии
            легализации доходов, полученных преступным путём, и финансированию терроризма». В рамках
            закона банки могут блокировать карты, отказывать в проведении сомнительных операций,
            ограничить доступ в интернет-банк или запрашивать документы, если по операции клиента
            возникли подозрения.{' '}
            <Link onClick={onClose}>Нажмите сюда, чтобы закрыть модалку без крестика</Link>
        </Typography.Text>
        <br />
        <Typography.Text tag='p'>
            Требования 115-ФЗ и связанных с ним документов Банка России часто меняются,
            предприниматели не всегда успевают за ними следить. Последствия нарушений
            «антиотмывочного» законодательства всегда неприятны: приходится остановить
            бизнес-процессы и доказать банку законность операций. Специалисты «Альфа-банка» собрали
            понятные рекомендации, как сэкономить время на объяснения и предотвратить блокировки
        </Typography.Text>
        <Collapse collapsedLabel='Подробнее' expandedLabel='Скрыть'>
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
            <br />
            <Typography.Text tag='p'>
                Вывод капитала за границу — это переводы нерезидентам по договорам об импорте
                работ/услуг и результатов интеллектуальной деятельности, по которым проведение
                расчётов осуществляется без одновременной уплаты НДС; по сделкам купли-продажи
                ценных бумаг, а также товаров, которые не пересекают границу России.
            </Typography.Text>
            <br />
            <Typography.Text tag='p'>
                Транзитные операции — операции, в процессе которых деньги поступают на счёт компании
                от других резидентов и списываются в короткие сроки. При этом, как правило, в этих
                случаях по счёту нет начислений зарплат, уплаты налогов, и они не соответствуют
                заявленному компанией виду деятельности.
            </Typography.Text>
            <br />
            <Typography.Text tag='p'>
                Запрашивать могут любые документы и устанавливать разные сроки их предоставления —
                это зависит от службы контроля конкретного банка. Обычно банки запрашивают чеки,
                счета или договора с контрагентами. В некоторых случаях бывает достаточно устных
                объяснений. Для проверки информации и пересмотра уровня риска банк может пригласить
                клиента в банк для устного разъяснения или выехать по месту ведения бизнеса клиента.
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

export const Modal = () => {
    const [open, setOpen] = useState(false);
    const [headerViewSelected, setHeaderView] = useState<any>(HEADER_SELECT_OPTIONS[0].key);
    const [footerViewSelected, setFooterView] = useState<any>(FOOTER_SELECT_OPTIONS[0].key);
    const [headerSettings, setHeaderSettings] = useState<any>(() => ({
        ...HEADER_SETTINGS.reduce((res, item) => ({ ...res, [item.name]: false }), {}),
        titleInContent: false,
    }));
    const [footerSettings, setFooterSettings] = useState<any>(() =>
        FOOTER_SETTINGS.reduce((res, item) => ({ ...res, [item.name]: false }), {}),
    );

    const showHeader =
        headerViewSelected !== HEADER_SELECT_OPTIONS[0].key ||
        headerSettings.hasCloser ||
        headerSettings.hasBackButton;

    const showFooter = footerSettings.hasPrimaryButton || footerSettings.hasSecondaryButton;

    const getKey = () =>
        `${JSON.stringify(headerSettings)}-${headerViewSelected}-${footerViewSelected}`;

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleHeaderSettingsChange = (_: any, { name, checked }: any) => {
        setHeaderSettings((prevState: any) => ({ ...prevState, [name]: checked }));
    };

    const handleFooterSettingsChange = (_: any, { name, checked }: any) => {
        setFooterSettings((prevState: any) => ({ ...prevState, [name]: checked }));
    };

    return (
        <Fragment>
            <Button size='xs' onClick={handleOpen}>
                Показать модалку
            </Button>

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

            <ModalMobile open={open} onClose={handleClose} key={getKey()}>
                {showHeader && (
                    <ModalMobile.Header
                        hasCloser={headerSettings.hasCloser}
                        hasBackButton={headerSettings.hasBackButton}
                        sticky={headerSettings.sticky}
                        align={
                            [
                                'compactTitleWithCenterAlign',
                                'compactTitleWithSubtitleAndCenterAlign',
                            ].includes(headerViewSelected)
                                ? 'center'
                                : undefined
                        }
                        title={
                            [
                                'defaultTitle',
                                'compactTitle',
                                'compactTitleWithSubtitle',
                                'compactTitleWithCenterAlign',
                                'compactTitleWithSubtitleAndCenterAlign',
                            ].includes(headerViewSelected)
                                ? 'Почему банк проверяет мои операции?'
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
                            [
                                'compactTitleWithSubtitle',
                                'compactTitleWithSubtitleAndCenterAlign',
                            ].includes(headerViewSelected)
                                ? 'Почему банк проверяет мои операции?'
                                : undefined
                        }
                    />
                )}
                <ModalMobile.Content>
                    {headerSettings.titleInContent ? (
                        <>
                            <Typography.Title view='xsmall' tag='div' font='system'>
                                {`Почему банк проверяет мои операции?`}
                            </Typography.Title>
                            <Gap size='m' />
                        </>
                    ) : undefined}

                    <Text onClose={handleClose} />
                </ModalMobile.Content>
                {showFooter && (
                    <ModalMobile.Footer sticky={footerSettings.sticky}>
                        <ModalMobile.Controls
                            layout={footerViewSelected === 'vertical' ? 'column' : 'space-between'}
                            primary={
                                footerSettings.hasPrimaryButton ? (
                                    <ButtonMobile
                                        view='primary'
                                        size='m'
                                        onClick={handleClose}
                                        block={true}
                                    >
                                        Primary
                                    </ButtonMobile>
                                ) : null
                            }
                            secondary={
                                footerSettings.hasSecondaryButton ? (
                                    <ButtonMobile
                                        view='secondary'
                                        size='m'
                                        onClick={handleClose}
                                        block={true}
                                    >
                                        Secondary
                                    </ButtonMobile>
                                ) : null
                            }
                        />
                    </ModalMobile.Footer>
                )}
            </ModalMobile>
        </Fragment>
    );
}