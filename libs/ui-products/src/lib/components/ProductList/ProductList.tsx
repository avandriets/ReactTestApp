import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@test-react-app/core';
import {
  fetchProducts,
  Product,
  selectProductById,
  selectProductIds,
} from '../../store';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { SortHeader } from '../SortHeader/SortHeader';
import { SortHeaderContext } from '../../context';
import { useHistory, useLocation } from 'react-router';

import './ProductList.scss';
import { removeFalsyValues } from '@test-react-app/ui-share';

const ProductExcerpt = ({ productId }) => {
  const product: Product = useSelector((state) => selectProductById(state, productId))

  return (
    <tr key={product.id}>
      <td>
        <Link to={`/products/${product.id}`}>{product.title}</Link>
      </td>
      <td>{product.category_id}</td>
      <td>{product.description}</td>
    </tr>
  );
}

export const ProductList = () => {

  const [sortField, sortFieldSet] = useState('');
  const history = useHistory();
  const location = useLocation();

  const sortFieldContext = useContext(SortHeaderContext);
  const toggleFunc = sortFieldContext.toggleSort;

  sortFieldContext.toggleSort = (field?: string, direction?: string) => {
    toggleFunc(field, direction);
    sortFieldSet(field);

    const params = removeFalsyValues({
      sort: field || null,
      direction: direction || null,
    });

    console.log('###', field, params);

    const query = new URLSearchParams();
    Object.keys(params).forEach(k => query.set(k, params[k]));

    history.push({ search: query.toString() });
  };

  const dispatch = useDispatch();
  const productsIds = useSelector(selectProductIds);

  const productsStatus = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

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
      dispatch(fetchProducts({}));
    }
  }, [productsStatus, dispatch]);

  // useEffect(() => {
  //
  //   console.log('##', location);
  //   // if (productsStatus === 'succeeded') {
  //   //   const query = new URLSearchParams(location.search);
  //   //   const params = {};
  //   //
  //   //   query.forEach((value, key) => {
  //   //     params[key] = value ?? null;
  //   //   });
  //   //
  //   //   dispatch(fetchProducts(removeFalsyValues(params)));
  //   // }
  //
  // }, [dispatch, location]);

  return (
    <SortHeaderContext.Provider value={sortFieldContext}>
      <div className="m-3">
        <h3>Products list</h3>
        {content}
      </div>
    </SortHeaderContext.Provider>
  );

}
