import request from '@/utils/request'

export function getList(query){
    return request({
        url: '/top/artists?limit=100',
        method: 'get',
        params: query
    })
}
export function getSingerDetail(query){
    return request({
        url: '/artists',
        method: 'get',
        params: query
    })
}