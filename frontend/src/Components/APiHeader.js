const token = sessionStorage.getItem('token');
console.log("gg", token)

export const headers = {
    'Authorization': `Bearer ${token}`,
};