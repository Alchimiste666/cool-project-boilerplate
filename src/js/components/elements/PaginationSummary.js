import React, { Fragment } from 'react';
import { FormattedMessage, FormattedPlural } from 'react-intl';

export default (props) => {
  const { page, count, hideStats, countOptions, totalCount, onSelectedCount } = props;

  const paginationCounts = (countOptions || [10, 20, 30]).map((value, index) => (
    value === count ?
      (
        <span key={index} class="pagination-count selected">{value}</span>
      ) : (
        <span key={index} class="pagination-count link" onClick={() => onSelectedCount(value)}>{value}</span>
      )
  ));

  if (page < 1 || count < 0) {
    return null;
  }

  const from = (page - 1) * count + 1;
  const to = Math.min(page * count, totalCount);

  const results = <FormattedPlural value={totalCount} one={<FormattedMessage id='PAGINATION.RESULT' />} other={<FormattedMessage id='PAGINATION.RESULTS' />} />;
  const shown = <FormattedPlural value={to} one={<FormattedMessage id='PAGINATION.ONE_SHOWN' />} other={<FormattedMessage id='PAGINATION.MANY_SHOWN' />} />;

  const showPaginationStats = typeof hideStats === 'boolean' ? !hideStats : true;

  return (
    <div class="pagination-summary">

      {showPaginationStats && (
        <span class="summary-frame">{totalCount === 0 ? <FormattedMessage id='PAGINATION.NO_RESULTS' /> : <Fragment>{totalCount} {results}</Fragment>}</span>
      )}

      {showPaginationStats && totalCount > 0 && (
        <Fragment>| <span class="summary-frame">{totalCount > 0 && <Fragment>{from} - {to} {shown}</Fragment>}</span></Fragment>
      )}

      {showPaginationStats && totalCount > 0 && paginationCounts.length > 0 && (
        <Fragment>| </Fragment>
      )}

      {totalCount > 0 && paginationCounts.length > 0 && (
        <span class="summary-frame"><FormattedMessage id='PAGINATION.DISPLAYING' />{paginationCounts}</span>
      )}

    </div>
  );
};
