import styles from './message.module.scss'
import capiSearch from '../../../public/capi_sunglasses_top.svg'
const Message = () => {
  return (
    <div className={styles.container_message}>
      <img src={capiSearch} alt="" className={styles.imgCapi}/>
      <div>
      <h3>Ups! I couldn't find any experience related to these categories</h3>
      <p>Try with others</p>
      </div>

    </div>
  )
}

export default Message
