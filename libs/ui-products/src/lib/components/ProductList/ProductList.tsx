import './ProductList.scss';
import React, { useContext, useEffect, useState } from 'react';
import { fetchProducts, selectProductIds } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { ProductExcerpt } from '../ProductExcerpt/ProductExcerpt';
import { SortHeader } from '../SortHeader/SortHeader';
import { SortHeaderContext } from '../../context';
import { Table } from 'react-bootstrap';
import isequal from 'lodash.isequal';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { removeFalsyValues } from '@test-react-app/ui-share';

export const ProductList = () => {

  const [sortField, sortFieldSet] = useState('');
  const [queryParams, queryParamsSet] = useState({});
  const history = useHistory();
  const location = useLocation();

  const sortFieldContext = useContext(SortHeaderContext);
  const toggleFunc = sortFieldContext.toggleSort;

  sortFieldContext.toggleSort = (field?: string, direction?: string) => {
    toggleFunc(field, direction);
    sortFieldSet(field);

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

  let content;

  switch (productsStatus) {
    case 'loading':
      content = <div>Loading...</div>
      break;
    case 'succeeded':
      content = productsIds.map((productId) => (
        <ProductExcerpt key={productId} productId={productId}/>
      ));

      content =
        <Table striped bordered hover>
          <thead>
          <tr>
            <SortHeader title="Title" apiField="title" sortable={true} currentSortField={sortField}/>
            <SortHeader title="Category" apiField="category_id" sortable={false}/>
            <SortHeader title="Description" apiField="description" sortable={true} currentSortField={sortField}/>
          </tr>
          </thead>
          <tbody>
          {content}
          </tbody>
        </Table>;

      break;
    case 'error':
      content = <div>{error}</div>
      break;

    default:
  }

  useEffect(() => {
    if (productsStatus === 'idle') {
      const query = new URLSearchParams(location.search);
      const params = {};

      query.forEach((value, key) => {
        params[key] = value ?? null;
      });

      queryParamsSet(params);

      dispatch(fetchProducts(params));
    }
  }, [productsStatus, dispatch, location]);

  useEffect(() => {

    if (productsStatus === 'succeeded') {

      const query = new URLSearchParams(location.search);
      const params = {};

      query.forEach((value, key) => {
        params[key] = value ?? null;
      });

      if (!isequal(queryParams, params)) {
        queryParamsSet(params);

        dispatch(fetchProducts(removeFalsyValues(params)));
      }
    }

  }, [dispatch, location, productsStatus, queryParams]);

  return (
    <SortHeaderContext.Provider value={sortFieldContext}>
      <div className="m-3">
        <h3>Products list</h3>
        {content}
      </div>
    </SortHeaderContext.Provider>
  );

}
