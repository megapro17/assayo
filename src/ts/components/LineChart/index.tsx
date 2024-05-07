import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';

import getSubLines from './helpers/getSubLines';
import Line from './components/Line';
import { IOptions, ISubLine } from './interfaces';

import style from './styles/index.module.scss';

interface ILineChartProps {
  options: IOptions;
  value?: number;
  details?: IHashMap<number>;
  className?: string;
}

function LineChart({
  options,
  value,
  details,
  className,
}: ILineChartProps): React.ReactElement | null {
  if (!value || value === 0) return  null;

  const width = Math.round((value ?? 100) * (100 / options.max));

  if (!details) {
    return (
      <div className={`${style.line_chart} ${className || ''}`}>
        <Line
          value={value ?? 100}
          width={width}
          suffix={options.suffix}
          formatter={options.formatter}
          className={style.line_chart_item}
        />
      </div>
    );
  }

  const subLines = getSubLines(details, options)
    .map((item: ISubLine) => (
      <Line
        key={item.title}
        title={item.title}
        value={item.value}
        width={item.width}
        color={options.color.get(item.title)}
        suffix={options.suffix}
        formatter={options.formatter}
        description={item.description}
        className={style.line_chart_sub_item}
      />
    ));

  return (
    <div className={`${style.line_chart} ${className || ''}`}>
      <div
        className={style.line_chart_item}
        style={{ width: `${width}%` }}
      >
        {subLines}
      </div>
    </div>
  );
}

LineChart.defaultProps = {
  value: 0,
  details: undefined,
  className: '',
};

export default LineChart;
