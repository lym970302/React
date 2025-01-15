import { request } from "@/utils/index";

//获取频道列表
export const getChannelAPI = () => {
  return request({
    url: "/channels",
    method: "GET",
  });
};

//提交文章
export const createArticleAPI = (data) => {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data,
  });
};

//更新文章
export const updateArticleAPI = (data) => {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: "POST",
    data,
  });
};

//获取文章列表
export const getAriticleListAPI = (params) => {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
};

//删除文章
export const delArticleAPI = (id) => {
  return request({
    url: `/mp/articles/${id}`,
    method: "POST",
  });
};

//获取文章详情
export const getArticleById = (id) => {
  return request({
    url: `/mp/articles/${id}`,
  });
};
