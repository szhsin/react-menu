import React from 'react';
import data from '../data/documentation';
import { HashHeading } from './HashHeading';
import { TableContents } from './TableContents';
import { DocSection } from './DocSection';


export const Docs = React.memo(function Docs() {

    return (
        <React.Fragment>
            <TableContents>
                {data}
            </TableContents>

            <main id="documentation">
                {data.map(({ id, title, desc, list }) => (
                    <React.Fragment key={id}>
                        <HashHeading id={id} title={title} />
                        {desc}
                        {list.map(item => <DocSection key={item.id} {...item} />)}
                    </React.Fragment>
                ))}
            </main >

            <div className="place-holder" role="presentation" />
        </React.Fragment>
    );
});
