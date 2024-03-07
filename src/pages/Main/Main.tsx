import styles from './Main.module.scss';
import { Title } from '@/shared/ui/Title';
import { Filter } from '@/widgets/Filter';
import { ProductsWidget } from '@/widgets/ProductsWidget';

const Main = () => (
    <section className={styles.wrapper}>
        <Title weight='medium' size='h1'>
            Поиск товаров
        </Title>
        <Filter />
        <ProductsWidget />
    </section>
);
export default Main;
