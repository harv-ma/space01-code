import { FC } from 'react';
import { Product } from '../types/Product';

interface IProps {
    products: Array<Product>;
    handleSort: (name: string) => void;
}

const ProductList: FC<IProps> = ({ products, handleSort }) => {
    return (
        <table className="text-white w-full">
            <thead>
                <tr>
                    <th onClick={() => handleSort('name')} className="sortable">
                        Product Name
                    </th>
                    <th
                        onClick={() => handleSort('price')}
                        className="sortable"
                    >
                        Price
                    </th>
                </tr>
            </thead>
            <tbody>
                {products.map((product: Product) => (
                    <tr key={product.name}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductList;
