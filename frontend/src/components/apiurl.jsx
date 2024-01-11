let apiurl,staticurl;

const url = "192.168.1.65" 
const frontEndUrl = `http://${url}:3000`
apiurl = `http://${url}:8000/api`
staticurl = `http://${url}:8000/`

// const url = "https://movie-ticket-booking-system-phi.vercel.app"
// const frontEndUrl = `https://meromovies.netlify.app`
// apiurl = `${url}/api`
// staticurl = `${url}/`



export {apiurl,staticurl,frontEndUrl}