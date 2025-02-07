/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@alfalab/core-components/button';
import { CalendarMobile } from '@alfalab/core-components/calendar/mobile';
import { Radio } from '@alfalab/core-components/radio';
import { RadioGroup } from '@alfalab/core-components/radio-group';

export const Calendar = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();

  const [firstRadioValue, setFirstRadioValue] = React.useState('single');

  React.useEffect(() => {
    setValue(undefined);
  }, [firstRadioValue]);

  const onFirstRadioChange = React.useCallback((_: any, payload: any) => {
    setFirstRadioValue(payload.value);
  }, []);

  return (
    <>
      <Button block={true} onClick={() => setOpen(true)}>
        Открыть календарь
      </Button>
      <CalendarMobile
        value={value}
        onChange={(value: any) => setValue(value)}
        selectorView={firstRadioValue === 'single' ? 'month-only' : 'full'}
        yearsAmount={firstRadioValue === 'single' ? 0 : 20}
        onClose={() => setOpen(false)}
        open={open}
      />
      <div style={{ marginTop: '32px' }}>
        <RadioGroup
          label="Контрол для выбора месяца и года"
          direction="vertical"
          name="radioGroup"
          onChange={onFirstRadioChange}
          value={firstRadioValue}
        >
          <Radio size="m" label="Слайдер месяцев" value="single" />
          <Radio size="m" label="Пикеры месяца и года" value="multiple" />
        </RadioGroup>
      </div>
    </>
  );
};
