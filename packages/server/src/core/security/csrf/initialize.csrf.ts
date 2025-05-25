import csrf from 'csrf';

export const initializeCsrf = () => {
  return new csrf({
    saltLength: 16,
    secretLength: 36,
  });
};
