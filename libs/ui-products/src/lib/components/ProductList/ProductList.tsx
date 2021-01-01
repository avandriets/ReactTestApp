import './ProductList.scss';
import { Breadcrumb, Button, Pagination, Table } from 'react-bootstrap';
import {
  PageLayout,
  UiStateLayout,
  removeFalsyValues,
} from '@test-react-app/ui-share';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { SFContext, SortHeaderContext } from '../../context';
import {
  fetchProducts,
  selectProductIds,
  selectProductsState,
  selectProductsTotal,
} from '@test-react-app/ui-products-store';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { ProductExcerpt } from '../ProductExcerpt/ProductExcerpt';
import Select from "react-select";
import { SortHeader } from '../SortHeader/SortHeader';
import { Status } from '@test-react-app/core';
import isequal from 'lodash.isequal';

const pageLimits = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
];

export const ProductList = () => {

  const history = useHistory();
  const location = useLocation();

  const sortFieldContext = useContext<SFContext>(SortHeaderContext);

  const [queryParams, queryParamsSet] = useState({});
  const [offset, offsetSet] = useState(null);
  const [selectedLimit, setSelectedLimit] = useState(pageLimits[0]);

  const toggleFunc = sortFieldContext.toggleSort;

  // init params
  sortFieldContext.init(location.search)

  sortFieldContext.toggleSort = (field?: string, direction?: string) => {
    toggleFunc(field, direction);

    const params = removeFalsyValues({
      sort_field: field || null,
      sort: direction || null,
    });

    const query = new URLSearchParams(location.search);
    Object.keys(params).forEach(k => query.set(k, params[k]));

    if (!field) {
      query.delete('sort_field');
      query.delete('sort');
    }

    history.push({ search: query.toString() });
  };

  const dispatch = useDispatch();
  const productsIds = useSelector(selectProductIds);

  const productsStatus: Status = useSelector(selectProductsState);
  const total = useSelector(selectProductsTotal);

  const onPaginationClick = React.useCallback((action: string) => {

    const limit = selectedLimit?.value || 5;
    const query = new URLSearchParams(location.search);

    let offset = +(query.get('offset') || 0);

    switch (action) {
      case 'first':
        offset = 0;
        break;
      case 'last':
        offset = total - limit;
        break;
      case 'next':
        offset += limit;
        offset = offset >= total ? offset - limit : offset;
        break;
      case 'prev':
        offset -= limit;
        offset = offset < 0 ? 0 : offset;
        break;
    }

    query.set('offset', `${offset}`);

    history.push({ search: query.toString() });

  }, [history, location, selectedLimit, total]);

  useEffect(() => {

    if (selectedLimit) {
      const query = new URLSearchParams(location.search);

      if (query.get('limit')) {
        query.set('limit', `${selectedLimit.value}`);
      } else {
        query.append('limit', `${selectedLimit.value}`);
      }

      if (query.get('offset') && sortFieldContext.limit !== query.get('limit')) {
        query.delete('offset');
      }

      history.push({ search: query.toString() });
    }

  }, [selectedLimit, history]);

  useEffect(() => {

    const query = new URLSearchParams(location.search);
    const params = {};

    query.forEach((value, key) => {
      params[key] = value ?? null;
    });

    offsetSet(+(query.get('offset') ?? 0));

    if (!productsStatus.err && !productsStatus.pending && !productsStatus.rejected && !productsStatus.resolved) {
      queryParamsSet(params);
      dispatch(fetchProducts(params));
    }

    if (productsStatus.resolved && !isequal(queryParams, params)) {
      queryParamsSet(params);
      dispatch(fetchProducts(removeFalsyValues(params)));
    }

  }, [dispatch, location, productsStatus, queryParams]);

  const header =
    <tr>
      <SortHeader title="Title" apiField="title" sortable={true}/>
      <SortHeader title="Category" apiField="category_id" sortable={false}/>
      <SortHeader title="Description" apiField="description" sortable={true}/>
    </tr>;

  const content = productsIds.map((productId) => (<ProductExcerpt key={productId} productId={productId}/>));

  const table =
    <Table striped bordered hover>
      <thead>
      {header}
      </thead>
      <tbody>
      {content}
      </tbody>
    </Table>;

  const body = (
    <Fragment>
      <div className="d-flex justify-content-between mb-3">
        <div>Showing: {offset + 1} - {offset + selectedLimit.value > total ? total : offset + selectedLimit.value} of {total}</div>
        <div className="limit">
          <Select options={pageLimits}
                  defaultValue={pageLimits.find(p => p.value === +sortFieldContext.limit) || pageLimits[0]}
                  onChange={setSelectedLimit}>
          </Select>
        </div>
      </div>

      {table}

      <div className="d-flex flex-row-reverse">
        <div className="d-flex align-items-center">
          <div
            className="mb-3 mr-4">Page {offset / selectedLimit.value + 1} of {total / selectedLimit.value}</div>
          <Pagination>
            <Pagination.First onClick={() => onPaginationClick('first')}/>
            <Pagination.Prev onClick={() => onPaginationClick('prev')}/>
            <Pagination.Next onClick={() => onPaginationClick('next')}/>
            <Pagination.Last onClick={() => onPaginationClick('last')}/>
          </Pagination>
        </div>
      </div>
    </Fragment>
  );
  return (
    <SortHeaderContext.Provider value={sortFieldContext}>
      <div className="m-3">
        <PageLayout>
          {{
            breadcrumb: (
              <Breadcrumb>
                <LinkContainer to="/">
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to="/dictionaries">
                  <Breadcrumb.Item>Dictionaries</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Products</Breadcrumb.Item>
              </Breadcrumb>
            ),
            title: <h3>Products list</h3>,
            action: <LinkContainer to="/dictionaries/products/new">
              <Button variant="danger">Create</Button>
            </LinkContainer>,
            body: (
              <UiStateLayout state={productsStatus}>
                {{
                  resolved: body,
                }}
              </UiStateLayout>
            ),
          }}
        </PageLayout>
      </div>
    </SortHeaderContext.Provider>
  );

}
