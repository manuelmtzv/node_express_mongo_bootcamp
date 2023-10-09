import { type Request, type Response, type NextFunction } from 'express';

export default function setComparisonOperators(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const queryString = JSON.stringify({ ...req.query }).replace(
    /\b(eq|gt|gte|in|lt|lte|ne|nin)\b/g,
    (match) => {
      return `$${match}`;
    },
  );

  req.query = JSON.parse(queryString);
  next();
}
