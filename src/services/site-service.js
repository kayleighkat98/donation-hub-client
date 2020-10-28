import config from '../config'
import TokenService from './token-service'

const SiteService = {
    postLocation({label, address, description, lat, lon}) {
        return fetch (`${config.API_ENDPOINT}/site`,{
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({ label, address, description, lat, lon }),
        }).then(res =>
            (!res.ok)
              ? res.json().then(err => Promise.reject(err))
              : res.json()
        )
    },
    search(...box) {
        return fetch (`${config.API_ENDPOINT}/site?rect=${box.join(',')}`,{
            method: 'GET',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        }).then(res =>
            (!res.ok)
              ? res.json().then(err => Promise.reject(err))
              : res.json()
        )
    },
}
export default SiteService