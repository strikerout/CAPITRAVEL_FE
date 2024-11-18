
import { ColorRing } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='loadingSpinner'>
      <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      <h3>Loading...</h3>
    </div> 
  )
}

export default Loading;
