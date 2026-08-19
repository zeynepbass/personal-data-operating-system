export const login = (provider) => async (data) => {
    const response = await provider.login(data);
  
    return response.data;
  };
  
  export const register = (provider) => async (data) => {
    const response = await provider.register(data);
  
    return response.data;
  };