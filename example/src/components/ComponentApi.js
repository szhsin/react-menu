import React from 'react';
import { HashHeading } from './HashHeading';
import {
    components as componentsData,
    hooks as hookData
} from '../data/components';
import { TableContents } from './TableContents';
import { ApiDoc } from './ApiDoc';


export const ComponentApi = React.memo(function ComponentApi() {

    const componentsHeading = {
        id: 'components',
        title: 'Components'
    };

    const hooksHeading = {
        id: 'hooks',
        title: 'Hooks'
    };

    const tableContents = [
        {
            ...componentsHeading,
            list: componentsData
        },
        {
            ...hooksHeading,
            list: hookData
        }
    ];

    return (
        <React.Fragment>
            <TableContents>
                {tableContents}
            </TableContents>

            <main id="components-api">
                <HashHeading {...componentsHeading} />
                {componentsData.map(item => <ApiDoc key={item.id} {...item} />)}
                <HashHeading {...hooksHeading} />
                {hookData.map(item => <ApiDoc key={item.id} {...item} />)}
            </main >

            <div className="place-holder" role="presentation" />
        </React.Fragment>
    );
});
