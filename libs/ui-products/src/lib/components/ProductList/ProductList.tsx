import './ProductList.scss';
import { Button, Table } from 'react-bootstrap';
import {
  PageLayout,
  UiStateLayout,
  arrowBack,
  arrowSmallLeft,
  removeFalsyValues,
} from '@test-react-app/ui-share';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  fetchProduct,
  selectProductIds,
} from '@test-react-app/ui-products-store';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { ProductExcerpt } from '../ProductExcerpt/ProductExcerpt';
import { SortHeader } from '../SortHeader/SortHeader';
import { SortHeaderContext } from '../../context';
import { Status } from '@test-react-app/core';
import isequal from 'lodash.isequal';

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

  const productsStatus: Status = useSelector((state: { sideBarToggle: any, products: any }) => state.products.status);
  const error = useSelector((state: { sideBarToggle: any, products: any }) => state.products.error);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const params = {};

    query.forEach((value, key) => {
      params[key] = value ?? null;
    });

    if (!productsStatus.err && !productsStatus.pending && !productsStatus.rejected && !productsStatus.resolved) {
      queryParamsSet(params);
      dispatch(fetchProduct(params));
    }

    if (productsStatus.resolved && !isequal(queryParams, params)) {
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
        <PageLayout>
          {{
            breadcrumb: (
              <Fragment>
                <span className="mr-2">{arrowBack}</span>
                <span className="mr-2"><Link to="./">Dictionaries</Link></span>
                <span className="mr-2"> {arrowSmallLeft} </span>
                <span><Link to="products">Products</Link></span>
              </Fragment>
            ),
            title: <h3>Products list</h3>,
            action: <Button variant="danger">Create</Button>,
            body: (
              <UiStateLayout state={productsStatus}>
                {{
                  resolved: table,
                }}
              </UiStateLayout>
            ),
          }}
        </PageLayout>
      </div>
    </SortHeaderContext.Provider>
  );

}
