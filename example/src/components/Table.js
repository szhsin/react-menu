import React from 'react';

export const Table = React.memo(function Table({ heading, sorting, head, rows }) {

    if (sorting) {
        rows.sort(({ [sorting.key]: r1 }, { [sorting.key]: r2 }) => {
            if (r1 < r2) {
                return -1;
            }
            if (r1 > r2) {
                return 1;
            }
            return 0;
        })
    }

    return (
        <>
            {heading}
            <table className="table">
                <thead>
                    <tr>
                        {head.map(({ key, value }) => <th key={key} scope="col">{value}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        rows.map((row, i) => (
                            <tr key={i}>
                                {head.map((th, i) => <td key={i}>{row[th.key]}</td>)}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
});
