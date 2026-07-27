import api from "./api";

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const extractResumeText = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/extract-text", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const parseResume = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/parse-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};