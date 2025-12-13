import api from "./api";

export const getJobSeekerApplications = () => {
    return api.get("/application/jobseeker/getall");
};

export const getEmployerApplications = () => {
    return api.get("/application/employer/getall");
};

export const postApplication = (applicationData) => {
    // applicationData should be JSON object with { name, email, phone, address, coverLetter, jobId }
    // or FormData if files are involved (but we removed resume upload).
    // Assuming JSON based on previous check.
    return api.post("/application/post", applicationData);
};

export const deleteApplication = (id) => {
    return api.delete(`/application/delete/${id}`);
};
