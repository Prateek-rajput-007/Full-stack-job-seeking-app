import api from "./api";

export const getAllJobs = () => {
    return api.get("/job/getall");
};

export const getJobDetails = (id) => {
    return api.get(`/job/${id}`);
};

export const getMyJobs = () => {
    return api.get("/job/getmyjobs");
};

export const postJob = (jobData) => {
    return api.post("/job/post", jobData);
};

export const updateJob = (id, jobData) => {
    return api.put(`/job/update/${id}`, jobData);
};

export const deleteJob = (id) => {
    return api.delete(`/job/delete/${id}`);
};
