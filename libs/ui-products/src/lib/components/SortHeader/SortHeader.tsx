import React, { PropsWithChildren, useContext, useState } from 'react';
import { SortHeaderInterface } from '@test-react-app/core';
import { arrowDown, arrowUp } from '@test-react-app/ui-share';
import { SortHeaderContext } from '../../context';

import './SortHeader.scss';

export const SortHeader: React.FC<SortHeaderInterface> = (props: PropsWithChildren<SortHeaderInterface>) => {

  const headerContext = useContext(SortHeaderContext);
  const [sort, sortSet] = useState('');

  const onSortClick = React.useCallback(() => {
    if (!props.sortable) {
      return;
    }

    const direction = sort === '' ? 'asc' : sort === 'asc' ? 'desc' : '';
    const field = direction !== '' ? props.apiField : '';

    sortSet(direction);

    headerContext.toggleSort?.(field, direction);

  }, [headerContext, props, sort]);

  return (
    <SortHeaderContext.Consumer>
      {({ sortField, sortDirection }) => {

        const active = sortField === props.apiField;
        const sortIcon = sortDirection === 'asc' ? arrowDown : sortDirection === 'desc' ? arrowUp : null;
        const style = props.sortable ? 'sort-header' : null;

        return <th className={style} onClick={onSortClick}>
              <span className="pr-1">
                {props.title}
              </span>
          {props.sortable && active ? sortIcon : null}
        </th>;

      }}
    </SortHeaderContext.Consumer>
  );

}
