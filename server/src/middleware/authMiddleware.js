import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  // Get the JWT token from the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    // Add the user ID to the request object
    req.userId = decodedToken.userId;

    console.log(req.userId)

    // Call the next middleware function
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
