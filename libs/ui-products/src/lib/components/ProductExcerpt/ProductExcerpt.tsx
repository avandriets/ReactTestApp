import {
  Product,
  selectProductEntity,
} from '@test-react-app/ui-products-store';
import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

export const ProductExcerpt = ({ productId }) => {
  const product: Product = useSelector(selectProductEntity(productId));

  return (
    <tr key={product.id}>
      <td>
        <Link to={`/dictionaries/products/${product.id}`}>{product.title}</Link>
      </td>
      <td>{product.category_id}</td>
      <td>{product.description}</td>
    </tr>
  );
}
