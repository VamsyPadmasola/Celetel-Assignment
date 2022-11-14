import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const createCustomer = async (customerInfo) => {
    try {
        const { data } = await client.post("/customer/create", customerInfo);
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) return response.data;

        return { error: error.message || error };
    }
};

export const getCustomers = async (pageNo, limit) => {
    const token = getToken()
    try {
        const { data } = await client(`/customer/customers?pageNo=${pageNo}&limit=${limit}`, {
            headers: {
                authorization: "Bearer " + token,
                "content-type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        return catchError(error)
    }
}

export const deleteCustomer = async (id) => {
    const token = getToken()
    try {
        const { data } = await client.delete("/customer/" + id, {
            headers: {
                authorization: "Bearer " + token,
            },
            // onUploadProgress: ({ loaded, total }) => {
            //     if (onUploadProgress)
            //     onUploadProgress(Math.floor((loaded / total) * 100));
            // },
        });
        return data;
    } catch (error) {
        return catchError(error)
    }
}

export const updateCustomer = async (id, formData) => {
    const token = getToken()
    console.log(formData)
    try {
        const { data } = await client.post("/customer/update/" + id, formData, {
            headers: {
                authorization: "Bearer " + token,
                // "content-type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        return catchError(error)
    }
}

export const searchCustomer = async (query) => {
    const token = getToken()
    try {
        const { data } = await client(`/customer/search?name=${query}`, {
            headers: {
                authorization: "Bearer " + token,
            },
        });
        return data;
    } catch (error) {
        return catchError(error)
    }
}