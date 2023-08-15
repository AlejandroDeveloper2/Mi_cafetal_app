const useValidator = () => {
  const validateEmail = (email) => {
    const regularExpression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (regularExpression.test(email)) return true;
    return false;
  };
  const validatePassword = (password) => {
    if (password.length >= 8) return true;
    return false;
  };
  const comparePasswords = (password, confirmedPassword) => {
    if (password === confirmedPassword) return true;
    return false;
  };
  const compareDate = (dateOne, dateTwo) => {
    if (Date.parse(dateOne) > Date.parse(dateTwo)) return true;
    return false;
  };

  return {
    validateEmail,
    validatePassword,
    comparePasswords,
    compareDate,
  };
};

export default useValidator;
