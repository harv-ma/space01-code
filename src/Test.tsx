import { FormEvent, useMemo, useState } from 'react';
import TextField from './components/shared-ui/TextField';
import ProductList from './components/ProductList';
import Fuse from 'fuse.js';
import Toggle from './components/shared-ui/Toggle';

const data = [
    { name: 'Item A', price: 125 },
    { name: 'Item B', price: 230 },
    { name: 'Item C', price: 295 },
    { name: 'Item D', price: 245 },
    { name: 'Item E', price: 900 },
    { name: 'Item F', price: 875 },
    { name: 'Item G', price: 235 },
    { name: 'Item H', price: 400 },
];

const Test = () => {
    const [filters, setFilters] = useState<{
        search?: string;
        sort?: string;
        sortAsc: boolean;
        limit5: boolean;
    }>({
        search: '',
        sort: 'price',
        sortAsc: true,
        limit5: true,
    });

    const filterProducts = () => {
        let products = [...data];

        // Sort
        if (filters.sort) {
            switch (filters.sort) {
                case 'name':
                    products.sort();
                    if (!filters.sortAsc) {
                        products.reverse();
                    }
                    break;
                case 'price':
                    products = products.sort((a, b) =>
                        filters.sortAsc ? a.price - b.price : b.price - a.price
                    );
            }
        }

        // Limit to top 5
        if (filters.limit5) {
            products = products.slice(0, 5);
        }

        // Search
        if (filters.search) {
            const fuse = new Fuse(products, {
                keys: ['name'],
                includeScore: false,
            });
            products = fuse.search(filters.search).map((item) => item.item);
        }

        return products;
    };

    const filteredProducts = useMemo<typeof data>(
        () => filterProducts(),
        [filters]
    );

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const handleToggle = (e: FormEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            [e.currentTarget.name]: e.currentTarget.checked,
        });
    };

    const handleSort = (name: string) => {
        if (filters.sort !== name) {
            setFilters({
                ...filters,
                sort: name,
                sortAsc: true,
            });
        } else if (filters.sortAsc) {
            setFilters({
                ...filters,
                sort: name,
                sortAsc: false,
            });
        } else {
            setFilters({
                ...filters,
                sort: undefined,
                sortAsc: true,
            });
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-full max-w-[600px] h-[600px] border border-white rounded-md p-8 shadow-white bg-neutral-800">
                <div className="flex justify-between items-center mb-5">
                    <TextField
                        name="search"
                        placeholder="Search"
                        value={filters.search}
                        onChange={handleInput}
                        autoComplete="off"
                    />
                    <Toggle
                        name="limit5"
                        label="Show top 5"
                        checked={filters.limit5}
                        onChange={handleToggle}
                    />
                </div>
                <ProductList
                    products={filteredProducts}
                    handleSort={handleSort}
                    sort={filters.sort}
                    sortAsc={filters.sortAsc}
                />
            </div>
        </div>
    );
};

export default Test;
