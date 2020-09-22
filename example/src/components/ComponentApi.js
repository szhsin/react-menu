import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import {
    components as componentData,
    hooks as hookData
} from '../data/components';
import { TableContents } from './TableContents';


export const ComponentApi = React.memo(function ComponentApi() {

    const tableContents = [
        {
            id: 'components',
            title: 'Components',
            list: componentData
        },
        {
            id: 'hooks',
            title: 'Hooks',
            list: hookData
        }
    ];

    const components = componentData.map(({ id, title, rows }) => (
        <React.Fragment key={id}>
            <Link className="hash-link" smooth to={`#${id}`}>
                <h1 id={id} className="heading">{title}</h1>
            </Link>

            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
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
        </React.Fragment>
    ));

    const hooks = hookData.map(({ id, title, desc }) => (
        <React.Fragment key={id}>
            <Link className="hash-link" smooth to={`#${id}`}>
                <h1 id={id} className="heading">{title}</h1>
            </Link>
            {desc}
        </React.Fragment>
    ));

    return (
        <React.Fragment>
            <TableContents>
                {tableContents}
            </TableContents>

            <main id="components-api">
                {components}
                {hooks}
            </main >

            <div className="place-holder" role="presentation" />
        </React.Fragment>
    );
});
