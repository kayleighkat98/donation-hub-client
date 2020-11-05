import config from '../config'
import TokenService from './token-service'

const SiteService = {
    postLocation(
        {lat, lon, label, address, description, formatted_phone_number, place_id, url, website,items}
    ){
        return fetch (`${config.API_ENDPOINT}/sites`,{
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({lat, lon, label, address, description, formatted_phone_number, place_id, url, website}),
            
        }).then(response =>
            (!response.ok)
              ? response.json().then(err => Promise.reject(err))
              : response.json()
        ).then(data =>{
            const site_id = data.id
            items.map((item)=>{
                let {item_name,critical_amount} = item
                critical_amount = parseInt(critical_amount)
                return fetch (`${config.API_ENDPOINT}/items/${site_id}/items`,{
                    method: 'POST',
                    headers: {
                        'authorization': `Bearer ${TokenService.getAuthToken()}`,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({item_name,critical_amount,site_id}),
        
                })
            });
            return data;
        })
    },
    search(...box) {
        return fetch (`${config.API_ENDPOINT}/sites?rect=${box.join(',')}`,{
            method: 'GET',
        }).then(res =>
 
            (!res.ok)
              ? res.json().then(err => Promise.reject(err))
              : res.json()
        )
    },
    findInventoryById (id) {
        return fetch (`${config.API_ENDPOINT}/items/${id}`,{
            method: 'GET',
        }).then(res =>
            (!res.ok)
              ? res.json().then(err => Promise.reject(err))
              : res.json()
        )
    }
}
export default SiteService