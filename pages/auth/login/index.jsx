import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Axios } from '../../../demo/components/variable';
import { Toast } from 'primereact/toast';
import { api_url } from '../../../demo/components/variable';
import axiosInterceptorInstance from '../../../demo/components/axios';
const LoginPage = () => {
    // const [user, setUser] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const router = useRouter();
    const [tokenInfo, setTokenInfo] = useState();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const toast = useRef(null);
    const userLogin  = async () => {
        if (username == '') {
            toast.current.show({ severity: 'error', summary: 'ຜິດພາດ', detail: 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້' });
        }
        else if (password == '') {
            toast.current.show({ severity: 'error', summary: 'ຜິດພາດ', detail: 'ກະລຸນາປ້ອນລະຫັດຜ່ານ' });
        }
        else if (password.length < 6) {
            toast.current.show({ severity: 'error', summary: 'ຜິດພາດ', detail: 'ກະລຸນາປ້ອນລະຫັດຜ່ານຫຼາຍກ່ວາ 6 ຕົວອັກສອນ' });
        }
        else {
        try {
            var raw = 'username=' + username + '&password=' + password + '&grant_type=password';
            const res = await axiosInterceptorInstance.post('/Token', raw);

            if (res.status === 200 || res.status === 201) {
                // setUser(emptyData);
                setUsername('');
                setPassword('');
                // localStorage.setItem('userName', JSON.stringify(res.data?.userName));
                // localStorage.setItem('token', JSON.stringify(res.data?.access_token));
                localStorage.setItem('userName', res.data?.userName);
                localStorage.setItem('token', res.data?.access_token);
                toast.current.show({ severity: 'success', summary: 'ສໍາເລັດ', detail: 'ເຂົ້າສູ່ລະບົບສໍາເລັດແລ້ວ' });
                router.push('/');
            }
            else {
                toast.current.show({ severity: 'error', summary: 'ຜິດພາດ', detail: 'ຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ' });
            }
        } catch (e) {
            toast.current.show({ severity: 'error', summary: 'ຜິດພາດ', detail: 'ຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ' });
        }
    }
    };

    // const userLogin = () => {
    //     try {

    //     var myHeaders = new Headers();
    //     myHeaders.append('Content-Type', 'text/plain');
    //     // var raw = 'username=part&password=12345&grant_type=password';
    //     var raw = 'username=' + username + '&password=' + password + '&grant_type=password';

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     fetch(`${api_url}/Token`, requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => {

    //             console.log(result)
    //             if (result.access_token){
    //                 // if (result.status==200){
    //                 toast.current.show({ severity: 'success', summary: 'ສໍາເລັດ', detail: 'ເຂົ້າສູ່ລະບົບສໍາເລັດແລ້ວ' })
    //                 setUsername('');
    //                 setPassword('');
    //                 localStorage.setItem('userName', result?.userName);
    //                 localStorage.setItem('token', result?.access_token);
    //                 router.push('/');

    //             }else{
    //                 toast.current.show({ severity: 'error', summary: 'ຜິດພາດ', detail: 'ລະຫັດ ຟຟລ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ' });
    //             }
    //         })
    //         .catch((error) => console.log('error', error));

    //     } catch (e) {
    //                 toast.current.show({ severity: 'error', summary: 'ຜິດພາດ', detail: 'ລະຫັດ ຟຟລ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ' });
    //             }
    // };

    return (
        <div className={containerClassName}>
            <Toast ref={toast} />
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`${contextPath}/layout/images/edl.png`} alt="EDL logo" className="mb-5 w-6rem flex-shrink-0" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            {/* <img src={`${contextPath}/demo/images/login/avatar.png`} alt="Image" height="50" className="mb-3" /> */}
                            <div className="text-900 text-3xl font-medium mb-3">ຍິນດີຕ້ອນຮັບ, EDL Loan!</div>
                            {/* <span className="text-600 font-medium">Sign in to continue</span> */}
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                ລະຫັດພະນັກງານ
                            </label>
                            <InputText inputid="email1" type="text" onChange={(e) => setUsername(e.target.value)} placeholder="ລະຫັດພະນັກງານ" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                ລະຫັດຜ່ານ
                            </label>
                            <Password inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                {/* <div className="flex align-items-center">
                                    <Checkbox inputid="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">ຈື່ຂ້ອຍໄວ້</label>
                                </div> */}
                            </div>
                            <Button label="ເຂົ້າລະບົບ" className="w-full p-3 text-xl" onClick={userLogin}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default LoginPage;
