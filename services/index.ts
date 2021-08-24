import axios from "axios"
import { baseUrl } from "configs/api";
import routes from "configs/routes";
import { IDepositSR, IWithdrawalSR } from "helpers/interfaces";

export interface INewUser {
    firstname: string;
    lastname: string;
    middlename?: string;
    email: string;
    password: string;
    password2: string;
}

export interface IReturningUser {
    email: string;
    password: string;
}

export const signup = async (user: any) => {
    return axios.post(baseUrl + '/users', user)
        .then(res => {
            return { code: 0, message: res.data };
        })
        .catch(err => extractErr(err));
}

export const login = async (user: IReturningUser) => {
    return axios.post(baseUrl + '/users/login', user)
        .then(res => {
            localStorage.setItem('token', res.data.message.token);

            return ({ code: 0, message: res.data });
        })
        .catch(err => extractErr(err));
}

const extractErr = (err: any) => {
    console.dir(err);
    let m;
    try {
        m = err.response.data.message.details[0].message;
    } catch (e) {
        m = err.response?.data?.message;
    }
    console.log(m);
    return { code: 1, message: m };
}

export const uploadToCloudinary = async (image: any) => {

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'profile_image');
    data.append('cloud_name', 'kryptocastle');

    return await fetch('https://api.cloudinary.com/v1_1/kryptocastle/image/upload', {
        method: 'post',
        body: data
    })
        .then(res => res.json())
        .catch(err => {
            return null;
        });
}

export const getUserDetails = async () => {
    const token = localStorage.get('token');
    if (!token) return null;

    return await axios.get(baseUrl + '/users/me', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data)
        .catch(err => {
            return null;
        });
}

export const ssrCheckTokenValidity = async (context: any) => {
    const token = context.req.cookies.auth;

    if (!token) {
        return [
            false, {
                redirect: {
                    destination: routes.login,
                    permanent: true
                }
            }
        ];
    }


    return await axios.get(baseUrl + '/users/me', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return [true, {}, res.data.data];
        })
        .catch(err => {
            return [
                false,
                {
                    redirect: {
                        destination: '/login',
                        permanent: true
                    }
                }
            ];
        });
}

export const updateProfilePicture = async (url: string) => {
    const token = localStorage.getItem('token');

    return await axios.post(baseUrl + '/users/update-image', { image: url }, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data)
        .catch(err => extractErr(err));
}

export const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admintoken');

    await axios.get(baseUrl + '/users/logout')
        .then(res => res.data)
        .catch(err => extractErr(err));
}

export const saveDeposit = async (deposit: IDepositSR) => {
    const d: any = { ...deposit };
    // return null;
    const token = localStorage.getItem('token');

    delete d.status;
    delete d.createdAt;
    delete d.updatedAt;

    return await axios.post(baseUrl + '/users/deposit', d, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data)
        .catch(err => {
            extractErr(err);
            return null;
        });
}

export const getDepositRef = async () => {
    const token = localStorage.getItem('token');

    return axios.get(baseUrl + '/users/deposit/create-ref', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data.data)
        .catch(err => null);
}

export const changePassword = async (o: string, p: string) => {
    const token = localStorage.getItem('token');

    return axios.post(baseUrl + '/users/change-password', {
        old: o,
        new: p
    }, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data)
        .catch(err => {
            return null;
        });
}

export const getWithdrawalRef = async () => {
    const token = localStorage.getItem('token');

    return axios.get(baseUrl + '/users/withdrawal/create-ref', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data.data)
        .catch(err => {
            return null;
        });
}

export const requestWithdrawal = async (w: IWithdrawalSR) => {
    const token = localStorage.getItem('token');

    const h: any = { ...w };
    delete h.createdAt;
    delete h.updatedAt;

    return axios.post(baseUrl + '/users/withdrawal', h, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data)
        .catch(err => {
            return null;
        });
}


///////////////////
// ADMIN
///////////////////
export const adminLogin = async (user: IReturningUser) => {
    return axios.post(baseUrl + '/admin/login', user)
        .then(res => {
            localStorage.setItem('admintoken', res.data.message.token);

            return ({ code: 0, message: res.data });
        })
        .catch(err => extractErr(err));
}

export const ssrAdminCheckTokenValidity = async (context: any) => {
    const token = context.req.cookies.auth;
    console.log('token', token);

    if (token == null || token == undefined) {
        console.log('token == null')
        return [
            false, {
                redirect: {
                    destination: routes.adminLogin,
                    permanent: true
                }
            }
        ];
    }
    return await axios.get(baseUrl + '/admin/whoami', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            console.log('res ->', res.data);
            return [true, {}, res.data.data];
        })
        .catch(err => {
            console.log('err ->', err)
            return [
                false,
                {
                    redirect: {
                        destination: routes.adminLogin,
                        permanent: true
                    }
                }
            ];
        });
}

export const adminGetAllUsers = () => {
    const token = localStorage.getItem('admintoken');

    return axios.get(baseUrl + '/admin/users', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data.data)
        .catch(err => {
            return null;
        });
}

export const adminGetDeposits = async () => {
    const token = localStorage.getItem('admintoken');

    return axios.get(baseUrl + '/admin/deposits', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data.data)
        .catch(err => {
            return null;
        });
}

export const adminGetWithdrawals = async () => {
    const token = localStorage.getItem('admintoken');

    return axios.get(baseUrl + '/admin/withdrawals', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data.data)
        .catch(err => {
            return null;
        });
}

export const adminApproveDeposit = async (d: Array<string>) => {
    const token = localStorage.getItem('admintoken');

    return axios.post(baseUrl + '/admin/deposits/approve', {
        deposits: d,
    }, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data)
        .catch(err => {
            return null;
        });
}

export const adminApproveWithdrawal = async (d: Array<string>) => {
    const token = localStorage.getItem('admintoken');

    return axios.post(baseUrl + '/admin/withdrawals/approve', {
        withdrawals: d,
    }, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data)
        .catch(err => {
            return null;
        });
}

export const adminChangePassword = async (o: string, p: string) => {
    const token = localStorage.getItem('admintoken');

    return axios.post(baseUrl + '/admin/change-password', {
        old: o,
        new: p
    }, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data)
        .catch(err => {
            return null;
        });
}