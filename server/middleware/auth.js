import jwt from 'jsonwebtoken';

const secret = 'code416';

export const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1];
    const googleOAuthToken = req.headers['x-google-oauth'];
    if (!token && !googleOAuthToken) {
      return res.status(401).json({ message: 'No token provided' });
    }
    if (googleOAuthToken) {
      token = googleOAuthToken;
    }
    let decodedData;
    if (googleOAuthToken) {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    } else {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    }
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      console.error('Error in auth middleware:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};


export const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized - Admin Access Required' });

  try {
    const decoded = jwt.verify(token, secret);
    if (decoded.email === 'admin@zeevoc.com') {
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (err) {
    res.status(403).json({ message: 'Token is invalid or expired' });
  }
};

