// const domain = "http://localhost:8090/jeecg-boot/lncc/api";
const domain = "http://lncc.linqingying.xyz/jeecg-boot/lncc/api";
const axios = require('axios');

import util from "@/util";

function httpRequest(url, method, data) {
    return axios({
        method: method,
        url: url,
        data: data
    });
}

/**
 * 获取所有数据（包括导航栏，内容，内容详情）
 * @returns {AxiosPromise}
 */
function getAll() {
    return httpRequest(domain + '/all', 'GET')
}

/**
 * 根据id获取导航详细信息
 * @param id
 * @returns {AxiosPromise}
 */
function getNavById(id) {
    return httpRequest(domain + '/nav/' + id, 'GET');
}

/**
 * 根据内容类型和id获取内容详细信息（类型包括：新闻，通知，交专详情）
 * @param type
 * @param id
 * @returns {AxiosPromise}
 */
function getContentDetailByTypeAndByType(type, id) {
    return httpRequest(domain + '/contentDetail?type=' + type + '&id=' + id, 'GET');
}

/**
 * 根据内容类型分页查询（类型包括：新闻，通知，交专详情）
 * @param type
 * @param pageNo
 * @param pageSize
 * @returns {AxiosPromise}
 */
function getByTypePageList(type, pageNo, pageSize) {
    return httpRequest(domain + '/contentList?type=' + type + '&pageNo=' + pageNo + '&pageSize=' + pageSize, 'GET');
}

/**
 * 根据标题搜索所有信息
 * @param title
 * @param pageNo
 * @param pageSize
 * @returns {AxiosPromise}
 */
function scarchByTitle(title,pageNo,pageSize) {
    return httpRequest(domain + '/search?title=' + title + '&pageNo=' + pageNo + '&pageSize=' + pageSize, 'GET');
}

export default {
    getAll,
    getContentDetailByTypeAndByType,
    getByTypePageList,
    scarchByTitle
}
