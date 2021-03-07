import React from 'react';
import { HashHeading } from './HashHeading';

export const DocSection = React.memo(function DocSection({
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
                    <h3>Props</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Default</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows
                                    .sort(({ name: n1 }, { name: n2 }) => {
                                        if (n1 < n2) {
                                            return -1;
                                        }
                                        if (n1 > n2) {
                                            return 1;
                                        }
                                        return 0;
                                    })
                                    .map(({ name, type, defaultVal, desc }) => (
                                        <tr key={name}>
                                            <td>{name}</td>
                                            <td>{type}</td>
                                            <td>{defaultVal}</td>
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
