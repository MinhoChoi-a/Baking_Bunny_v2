import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import {prettyDOM} from '@testing-library/dom'

import Togglable from './Togglable'

test('renders content', () => {

    const note = {
        content: 'Component testing',
        important: true
    }

    const component = render(
        <Togglable prop={something} />
    )

    expect(component.container).toHaveTextContent(
        'Component testing is done'
    )

    //component.getByText => return object

    //component.container.querySelector('.note')

    //console.log(prettyDOM(component))
})