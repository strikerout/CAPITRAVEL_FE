import styles from './message.module.scss'
import capiSearch from '../../../public/capi_sunglasses_top.svg'
const Message = ({message, recommendation}) => {
  return (
    <div className={styles.container_message}>
      <img src={capiSearch} alt="" className={styles.imgCapi}/>
      <div>
      <h3>{message}</h3>
      <p>{recommendation}</p>
      </div>

    </div>
  )
}

export default Message
