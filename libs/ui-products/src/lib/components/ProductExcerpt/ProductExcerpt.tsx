import { Product, selectProductById } from '../../store';
import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

export const ProductExcerpt = ({ productId }) => {
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
