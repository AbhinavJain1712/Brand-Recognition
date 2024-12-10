const extractExpiryDate = (text) => {
	const dateRegex = /\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})\b/;
	const match = text.match(dateRegex);
	return match ? match[0] : null;
  };
  
  const isExpired = (date) => {
	const today = new Date();
	const expiryDate = new Date(date);
	return expiryDate < today;
  };
  
  const calculateLifespan = (date) => {
	const today = new Date();
	const expiryDate = new Date(date);
	const diffInMs = expiryDate - today;
	return diffInMs > 0 ? Math.ceil(diffInMs / (1000 * 60 * 60 * 24)) : 0;
  };
  
  export { extractExpiryDate, isExpired, calculateLifespan };
  