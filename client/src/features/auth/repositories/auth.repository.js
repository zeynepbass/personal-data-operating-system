export const login = (provider) => async (data) => {
    const response = await provider.login(data);
  
    return response.data;
  };
  
  export const register = (provider) => async (data) => {
    const response = await provider.register(data);
  
    return response.data;
  };
    
  export const forgot = (provider) => async (data) => {
    const response = await provider.password(data);
  
    return response.data;
  };
  export const profile = (provider) => async (id,data) => {

    const response = await provider.profile(id,data);
  
    return response.data;
  };