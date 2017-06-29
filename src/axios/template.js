import axios from './axios'

export function createTemplate (data = {}) {
  return axios({
    method: 'POST',
    url: '/templates',
    data: data
  })
}

export function showTemplate (id = {}) {
  return axios({
    method: 'GET',
    url: `/sale/sz/${id}`
  })
}

export function editTemplate (data = {}, id = {}) {
  return axios({
    method: 'PUT',
    url: `/templates/${id}`,
    data: data
  })
}

export function deleteTemplate (id = {}) {
  return axios({
    method: 'DELETE',
    url: `/templates/${id}`
  })
}
