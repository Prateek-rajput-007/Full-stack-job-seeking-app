import api from "./api";

export const login = (email, password, role) => {
    return api.post("/user/login", { email, password, role });
};

export const register = (registerData) => {
    // registerData can be object or FormData
    // If it's multipart (file upload), axios handles it if passed as FormData, 
    // but we might need to override 'Content-Type' if we set it to json globally.
    // However, in this app registration seems simple JSON usually.
    // If it was FormData, we'd do:
    // return api.post("/user/register", registerData, { headers: { "Content-Type": "multipart/form-data" } });
    if (registerData instanceof FormData) {
        return api.post("/user/register", registerData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    }
    return api.post("/user/register", registerData);
};

export const logout = () => {
    return api.get("/user/logout");
};

export const getUser = () => {
    return api.get("/user/getUser");
};
