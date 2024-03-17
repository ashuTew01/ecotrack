const asyncHandler = fn => (req, res, next) => {
   Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;

// Now we don't need to have try catch blocks