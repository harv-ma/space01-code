/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Test from '../src/Test';

const testData = [
    { name: 'Item A', price: 125 },
    { name: 'Item B', price: 230 },
    { name: 'Item C', price: 295 },
    { name: 'Item D', price: 245 },
    { name: 'Item E', price: 900 },
    { name: 'Item F', price: 875 },
    { name: 'Item G', price: 235 },
    { name: 'Item H', price: 400 },
];

test('Landing page renders successfully', async () => {
    render(<Test />);
});

test('ProductList toggles between showing first 5 or all', async () => {
    const { container } = render(<Test />);

    // Find elements
    const toggleInput = container.querySelector('input[name="limit5"]');
    if (!toggleInput) fail('Cannot find element');
    const tbody = container.querySelector('tbody');
    if (!tbody) fail('Cannot find element');

    const numberOfRowsBefore = tbody.childNodes;
    if (numberOfRowsBefore.length !== 5) fail('Not enough rows');

    // Click toggle
    await userEvent.click(toggleInput);

    const numberOfRowsAfter = tbody.childNodes;
    if (numberOfRowsAfter.length !== testData.length) fail('Not enough rows');
});
