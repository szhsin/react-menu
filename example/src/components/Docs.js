import React from 'react';
import { HashHeading } from './HashHeading';
import {
    components as componentsDoc,
    hooks as hookDoc,
    accessibility as accessibilityDoc
} from '../data/documentation';
import { TableContents } from './TableContents';
import { ApiDoc } from './ApiDoc';


export const Docs = React.memo(function Docs() {

    const docs = [
        componentsDoc,
        hookDoc,
        accessibilityDoc
    ];

    return (
        <React.Fragment>
            <TableContents>
                {docs}
            </TableContents>

            <main id="documentation">
                {docs.map(({ id, title, desc, list }) => (
                    <React.Fragment key={id}>
                        <HashHeading id={id} title={title} />
                        {desc}
                        {list.map(item => <ApiDoc key={item.id} {...item} />)}
                    </React.Fragment>
                ))}
            </main >

            <div className="place-holder" role="presentation" />
        </React.Fragment>
    );
});
