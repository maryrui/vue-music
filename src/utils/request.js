import axios from 'axios'

// import store from '@/store'
import {baseUrl} from "./env";
// import {getToken} from '@/utils/auth'

const service=axios.create({
    baseURL:baseUrl,
})

service.interceptors.request.use(config=>{
    /*if(store.getters.token){
        config.headers['X-Token']=getToken()
    }*/
    return config
},error=>{
        console.log(error);
        Promise.reject(error)
    }
)

service.interceptors.response.use(
        response=> response.data,/*{
            const res = response.data;
            /!*if (!res.Success) {
                Message({
                    message: res.Msg.message,
                    duration: 5000,
                    type: "error"
                })
            } else {
                return response.data
            }*!/
        },*/

        error => {
            console.log('err' + error);
            alert( error.message)
            return Promise.reject(error)
        }

)

export default service