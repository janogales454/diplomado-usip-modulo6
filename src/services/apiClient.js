import axios from 'axios';

const apiClient = axios.create({
      baseURL: process.env.VUE_APP_API_URL, // Your API base URL
      headers: {
        'Content-type': 'application/json',
      },
    });

export const getTipos = (params) => apiClient.get('/tipos' + params);
export const createTipo = (itemData) => apiClient.post('/tipos', itemData);
export const updateTipo = (id, itemData) => apiClient.patch(`/tipos/${id}`, itemData);
export const deleteTipo = (id) => apiClient.delete(`/tipos/${id}`);

export const getHelados = (params) => apiClient.get('/helados' + params);
export const createHelado = (itemData) => apiClient.post('/helados', itemData);
export const updateHelado = (id, itemData) => apiClient.patch(`/helados/${id}`, itemData);
export const deleteHelado = (id) => apiClient.delete(`/helados/${id}`);

export const getVentas = (params) => apiClient.get('/ventas' + params);
export const createVenta = (itemData) => apiClient.post('/ventas', itemData);
export const updateVenta = (id, itemData) => apiClient.patch(`/ventas/${id}`, itemData);
export const deleteVenta = (id) => apiClient.delete(`/ventas/${id}`);
