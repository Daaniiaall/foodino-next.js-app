import Card from '../modules/Card'
import styles from './MenuPage.module.css'

function MenuPage({data}) {
    // console.log(data)
  return (
    <div className={styles.container}>
      <h2>Menu</h2>
      <div className={styles.subContainer}>
        {data.map((food)=>(<Card key={food.id} food={food}/>))}
      </div>
    </div>
  )
}

export default MenuPage