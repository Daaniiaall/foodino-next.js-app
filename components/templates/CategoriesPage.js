import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Card from '../modules/Card'

import styles from './CategoriesPage.module.css'

function CategoriesPage({data}) {

    const router = useRouter()

    const [query , setQuery] = useState({difficulty: "" , time: ""})
    
    const changeHandler = (e) => {
        setQuery({...query , [e.target.name]:e.target.value})
    }

    const searchHandler = () => {
        // console.log(query);
        router.push({pathname:"/categories" , query:query})
    }

    // when user refreshed CategoriesPage ==> we want set Query values on selectBox 
    useEffect(() => {
        const {difficulty , time} = router.query

        if(query.difficulty !== difficulty || query.time !== time){
            setQuery({difficulty , time})
        }
        
    } , [])

  return (
    <div className={styles.container}>
        <h2>Categories</h2>

        <div className={styles.subContainer}>

            <div className={styles.select} onChange={changeHandler}>

                <select name='difficulty' value={query.difficulty}>
                    <option value="">Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>

                <select name='time' value={query.time}>
                    <option value="">Cooking Time</option>
                    <option value="more">More than 30 min</option>
                    <option value="less">Less than 30 min</option>
                </select>

                <button onClick={searchHandler}>Search</button>
            </div>

            <div className={styles.cards}>
                {!data.length ? <img src='/images/search.png' alt='category image'/> : null}
                
                {data.map((food) => (
                    <Card key={food.id} food={food} />
                ))}
            </div>

        </div>
    </div>
  )
}

export default CategoriesPage