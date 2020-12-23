import './ProductList.scss';
import React, { useContext, useEffect, useState } from 'react';
import {
  fetchProduct,
  selectProductIds,
} from '@test-react-app/ui-products-store';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { ProductExcerpt } from '../ProductExcerpt/ProductExcerpt';
import { SortHeader } from '../SortHeader/SortHeader';
import { SortHeaderContext } from '../../context';
import { Table } from 'react-bootstrap';
import isequal from 'lodash.isequal';
import { removeFalsyValues } from '@test-react-app/ui-share';

export const ProductList = () => {

  const [queryParams, queryParamsSet] = useState({});
  const history = useHistory();
  const location = useLocation();

  const sortFieldContext = useContext(SortHeaderContext);
  const toggleFunc = sortFieldContext.toggleSort;

  // init header
  const query = new URLSearchParams(location.search);

  sortFieldContext.sortField = query.get('sort_field') || '';
  sortFieldContext.sortDirection = query.get('sort') || '';

  sortFieldContext.toggleSort = (field?: string, direction?: string) => {
    toggleFunc(field, direction);

    const params = removeFalsyValues({
      sort_field: field || null,
      sort: direction || null,
    });

    const query = new URLSearchParams();
    Object.keys(params).forEach(k => query.set(k, params[k]));

    history.push({ search: query.toString() });
  };

  const dispatch = useDispatch();
  const productsIds = useSelector(selectProductIds);

  const productsStatus = useSelector((state: { sideBarToggle: any, products: any }) => state.products.status);
  const error = useSelector((state: { sideBarToggle: any, products: any }) => state.products.error);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const params = {};

    query.forEach((value, key) => {
      params[key] = value ?? null;
    });

    if (productsStatus === 'idle') {
      queryParamsSet(params);
      dispatch(fetchProduct(params));
    }

    if (productsStatus === 'succeeded' && !isequal(queryParams, params)) {
      queryParamsSet(params);
      dispatch(fetchProduct(removeFalsyValues(params)));
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

  return (
    <SortHeaderContext.Provider value={sortFieldContext}>
      <div className="m-3">
        <h3>Products list</h3>
        {productsStatus === 'loading' ? <div>Loading</div> : null}
        {productsStatus === 'error' ? <div>{error}</div> : table}
      </div>
    </SortHeaderContext.Provider>
  );

}
