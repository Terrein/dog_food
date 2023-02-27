import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router';
import s from './cardInfo.module.css'
import NotFound from "../NotFound/notFound";

const CardInfo = ({ goods }) => {
    const navigate = useNavigate();
    const { _id } = useParams()
    const detailInfo = useMemo(() => goods.find(el => _id === el._id), [goods, _id])

    return (
        <>
            {!detailInfo ? <NotFound /> :
                <>
                    <button className={`${s.back_Button} ${s.back_ButtonEffects}`} onClick={() => navigate(-1)}>Назад</button>
                    <div className={s.container}>
                        <h2>
                            Детальная информация о товаре "{detailInfo?.name}"
                        </h2>
                        <div className={s.detail__info}>
                            <img src={detailInfo?.pictures} className={s.img_info}></img>
                            <div className={s.description}>
                                <h2>О товаре:</h2>
                                <span className={s.desc}>{detailInfo?.description}</span>
                                <h2>Цена:</h2>
                                <span className={s.price}>{detailInfo?.price}₽</span>
                            </div>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default CardInfo


