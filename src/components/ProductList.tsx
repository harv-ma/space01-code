import { FC } from 'react';
import { Product } from '../types/Product';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

interface IProps {
    products: Array<Product>;
    handleSort: (name: string) => void;
    sort?: string;
    sortAsc: boolean;
}

const SortArrow: FC<{ sort?: string; sortAsc: boolean; name: string }> = ({
    sort,
    sortAsc,
    name,
}) => {
    if (!sort || sort !== name) return null;

    return sortAsc ? <BiSolidDownArrow /> : <BiSolidUpArrow />;
};

const ProductList: FC<IProps> = ({ products, handleSort, sort, sortAsc }) => {
    return (
        <table className="text-white w-full">
            <thead>
                <tr>
                    <th onClick={() => handleSort('name')} className="sortable">
                        <div>
                            Product Name
                            <SortArrow
                                sort={sort}
                                sortAsc={sortAsc}
                                name="name"
                            />
                        </div>
                    </th>
                    <th
                        onClick={() => handleSort('price')}
                        className="sortable"
                    >
                        <div>
                            Price
                            <SortArrow
                                sort={sort}
                                sortAsc={sortAsc}
                                name="price"
                            />
                        </div>
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
