import { AppLink } from '@/shared/ui/AppLink';
import { AppRouter } from '@/app/providers/Router';
import { ThemeSwitcher } from '@/widgets/ThemeSwwitcher';
import styles from './App.module.scss';
import { Text } from '@/shared/ui/Text';
import { ScrollUp } from '@/widgets/ScrollUp/ScrollUp';

export const App = () => (
    <>
        <header className={styles.header}>
            <nav className={styles.nav}>
                <AppLink to={{ pathname: '/', search: 'page=1' }}>
                    <img src='/assets/logo.png' alt='Logo' width={30} height={30} />
                    <Text weight='medium'>Valantis</Text>
                </AppLink>
            </nav>
            <a href='https://github.com/PaulSamPS/ValantisJewelry' target='_blank' rel='noreferrer'>
                Source Code
            </a>
            <ThemeSwitcher />
        </header>
        <main className={styles.main}>
            <AppRouter />
            <ScrollUp />
        </main>
        <footer className={styles.footer}>
            Valantis&copy;
            {new Date().getFullYear()}
        </footer>
    </>
);
