import React from 'react';
import {
    stylesheet as stylesheetDoc
} from '../data/styleGuide';
import { HashHeading } from './HashHeading';
import { TableContents } from './TableContents';
import { StyleDoc } from './StyleDoc';


export const StyleGuide = React.memo(function StyleGuide() {

    const docs = [
        stylesheetDoc
    ]; 

    return (
        <React.Fragment>
            <TableContents>
                {docs}
            </TableContents>

            <main id="style-guide">
                {docs.map(({ id, title, desc, list }) => (
                    <React.Fragment key={id}>
                        <HashHeading id={id} title={title} />
                        {desc}
                        {list.map(item => <StyleDoc key={item.id} {...item} />)}
                    </React.Fragment>
                ))}
            </main >

            <div className="place-holder" role="presentation" />
        </React.Fragment>
    );
});
