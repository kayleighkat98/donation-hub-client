import config from '../config'
import TokenService from './token-service'

const SiteService = {
    postLocation({ lat, lon, label, address, description, formated_phone_number, place_id, url, website}) {
        return fetch (`${config.API_ENDPOINT}/sites`,{
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({lat, lon, label, address, description, formated_phone_number, place_id, url, website}),
            
        }).then(res =>
            (!res.ok)
              ? res.json().then(err => Promise.reject(err))
              : res.json()
        )
    },
    // postItem({item_name, critical_amount})
    search(...box) {
        return fetch (`${config.API_ENDPOINT}/sites?rect=${box.join(',')}`,{
            method: 'GET',
        }).then(res =>
 
            (!res.ok)
              ? res.json().then(err => Promise.reject(err))
              : res.json()
        )
    },
}
export default SiteService