import request from '@/utils/request'

export function getSong(query){
    return request({
        url: '/music/url',
        method: 'get',
        params: query
    })
}