import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';
import { Title } from '@/shared/ui/Title';
import { Button } from '@/shared/ui/Button';

const NotFound = () => {
    const navigate = useNavigate();

    const onNavigateToMain = () => {
        navigate('/');
    };

    return (
        <div className={styles['not-found']}>
            <div className={styles.wrapper}>
                <img src='assets/logo.png' alt='Logo' width={150} height={150} />
                <Title weight='regular' size='h1'>
                    Страница не найдена
                </Title>
                <Button size='m' appearance='primary' onClick={onNavigateToMain}>
                    На главную
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
