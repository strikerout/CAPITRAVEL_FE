import capiPassport from "../../public/capi_passport.svg"

const BannerDashboard = () => {
  return (
<section className="bannerDashboard">
<img src={capiPassport} alt="Icon of capibara"/>
<h2>Welcome to the CapiTravel Dashboard</h2>
<p>Manage categories, properties, experiences and collaborators to create memorable adventures.</p>
</section> 
  )
}

export default BannerDashboard


