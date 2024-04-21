export const handleError = async (func) => {
  try {
    return await func();
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.info("Request failed with status:", error.response.status);
      console.info("Request data:", error);
      if (error.response.status === 500)
        return {
          data: {
            success: false,
            message: error.response?.data.message,
          },
        };
    } else if (error.response.status === 401) {
      // The request was made but no response was received
      console.error("Token exired:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Request setup error:", error.message);
    }
  }
};
