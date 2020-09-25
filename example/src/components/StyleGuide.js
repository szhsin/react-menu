import React from 'react';
import data from '../data/styleGuide';
import { HashHeading } from './HashHeading';
import { TableContents } from './TableContents';
import { StyleSection } from './StyleSection';


export const StyleGuide = React.memo(function StyleGuide() {

    return (
        <React.Fragment>
            <TableContents>
                {data}
            </TableContents>

            <main id="style-guide">
                {data.map(({ id, title, desc, list }) => (
                    <React.Fragment key={id}>
                        <HashHeading id={id} title={title} />
                        {desc}
                        {list && list.map(item => <StyleSection key={item.id} {...item} />)}
                    </React.Fragment>
                ))}
            </main >

            <div className="place-holder" role="presentation" />
        </React.Fragment>
    );
});
