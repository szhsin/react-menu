import React from 'react';
import { HashHeading } from './HashHeading';

export const StyleSection = React.memo(function StyleSection({
    id,
    title,
    desc,
    rows
}) {

    return (
        <section aria-labelledby={id}>
            <HashHeading id={id} title={title} heading="h2" />
            {desc}
            {rows &&
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">CSS selectors</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows.map(({ name, desc }, i) => (
                                    <tr key={i}>
                                        <td>{name}</td>
                                        <td>{desc}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </>}
        </section>
    );
});
