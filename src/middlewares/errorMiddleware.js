const errorHandler = (error, req,res,next)=>{
  res.status(404).json({ msg: 'error page not found' });
}


export default errorHandler