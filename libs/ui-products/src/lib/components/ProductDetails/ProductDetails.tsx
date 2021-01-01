import './ProductDetails.scss';
import { Breadcrumb, Button, Form } from 'react-bootstrap';
import { PageLayout, UiStateLayout, removeFalsyValues } from '@test-react-app/ui-share';
import {
  Product,
  createProduct,
  deleteProduct,
  fetchProductById,
  productsActions,
  selectProductEntity,
  selectProductsState,
  updateProduct,
} from '@test-react-app/ui-products-store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Status } from '@test-react-app/core';
import { useHistory } from 'react-router';

interface Props {
  match: { params: { id: string | undefined } };
}

export const ProductDetails: React.FC<Props> = ({ match: { params: { id } } }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const currentProduct: Product = useSelector(selectProductEntity(id));
  const productStatus: Status = useSelector(selectProductsState);

  const [product, setProduct] = useState<Product>({ id: '', title: '', description: '', category_id: '' });

  const onTitleChanged = (e) => setProduct({ ...product, title: e.target.value });
  const onDescriptionChanged = (e) => setProduct({ ...product, description: e.target.value });

  const onSaveProductClicked = async () => {
    if (product.title && product.description) {

      let savedProductData;
      const newProduct = removeFalsyValues({ ...product });

      if (id === 'new') {
        savedProductData = await dispatch(createProduct({...newProduct, category_id: null}));
      } else {
        savedProductData = await dispatch(updateProduct({...newProduct, category_id: null}));
      }

      if ((savedProductData as any)?.payload?.id) {
        history.push(`/dictionaries/products/${(savedProductData as any).payload.id}`);
      }
    }
  }

  const onDeleteProductClicked = async () => {
    await dispatch(deleteProduct({...product}));
    history.push(`/dictionaries/products`);
  }

  useEffect(() => {
    const idle = !productStatus.err && !productStatus.pending && !productStatus.rejected && !productStatus.resolved;

    if (idle && id !== 'new') {
      dispatch(fetchProductById(id));
    }

    if (idle && id === 'new') {
      dispatch(productsActions.setResolved());
    }
  }, [dispatch, productStatus, id]);

  useEffect(() => {
    if (currentProduct) {
      setProduct(currentProduct);
    }
  }, [currentProduct]);

  const form = <div className="w-50">
    <Form>
      <Form.Group controlId="productForm.ControlTitle">
        <Form.Label>Product Title:</Form.Label>
        <Form.Control placeholder="Enter a product name"
                      value={product?.title}
                      onChange={onTitleChanged}/>
      </Form.Group>

      <Form.Group controlId="productForm.ControlDescription">
        <Form.Label>Product Description:</Form.Label>
        <Form.Control as="textarea"
                      rows={3}
                      placeholder="Enter a description for product"
                      value={product?.description}
                      onChange={onDescriptionChanged}/>
      </Form.Group>
    </Form>
    <Button onClick={onSaveProductClicked}>
      Save Product
    </Button>
  </div>;

  return (
    <div className="m-3">
      <PageLayout>
        {{
          breadcrumb: (
            <Breadcrumb>
              <LinkContainer to="/">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
              </LinkContainer>
              <LinkContainer to="../">
                <Breadcrumb.Item>Dictionaries</Breadcrumb.Item>
              </LinkContainer>
              <LinkContainer to="./">
                <Breadcrumb.Item>Products</Breadcrumb.Item>
              </LinkContainer>
              <Breadcrumb.Item active>{ id === 'new' ? 'New Product' : product?.title }</Breadcrumb.Item>
            </Breadcrumb>
          ),
          title: id !== 'new' ? <h3>Product Details: {product?.title}</h3> : <h3>New Product</h3>,
          action: id !== 'new' ? <Button variant="danger" onClick={onDeleteProductClicked}>Delete</Button> : null,
          body:
            <UiStateLayout state={productStatus}>
              {{
                resolved: form,
              }}
            </UiStateLayout>
        }}
      </PageLayout>
    </div>
  );

}
