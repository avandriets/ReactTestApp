import React from 'react';
import { render } from '@testing-library/react';

import Dictionaries from './Dictionaries';

describe('Dictionaries', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Dictionaries />);
    expect(baseElement).toBeTruthy();
  });
});
