import React from "react";
import Error from './Error.svgz';
import { Link } from 'react-router-dom';
import s from './notFound.module.css';
const NotFound = () => {
    return (
        <>
            <div className={s.notFound}>
                <img src={Error} className={s.image} aria-hidden="true" />
                <h1 className={s.title}>Сраница не найдена.</h1>
                <Link to="/" className="btn" >На главную</Link>
            </div>

        </>
    );
}

export default NotFound;
