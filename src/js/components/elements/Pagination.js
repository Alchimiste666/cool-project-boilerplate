import 'rc-pagination/assets/index.css';

import React, { Fragment } from 'react';
import RcPagination from 'rc-pagination';

export default (props) => {
    const { page, count, pageSize, onSelectedPage } = props;

    return (
        <Fragment>
            {count > pageSize && (
                <div class="pagination-container">
                    <RcPagination current={page} pageSize={pageSize} total={count} onChange={onSelectedPage} />
                </div>
            )}
        </Fragment>
    );
};
