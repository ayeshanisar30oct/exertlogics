const catchAsync = (fn) => (req, res) => {
    fn(req, res).catch((err) => {
      console.error(err.message);
      res.status(500).json({ status: 'fail', message: err.message });
    });
  };
  
  export default catchAsync;
  