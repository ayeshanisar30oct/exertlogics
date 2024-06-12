// Ensure Next.js parses the request body as multipart/form-data
export const config = {
    api: {
      bodyParser: false,
    },
  };