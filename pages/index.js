import getConfig from 'next/config';

import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '../layout/context/layoutcontext';
import { useRouter } from 'next/router';


const Dashboard = () => {
    const [products, setProducts] = useState(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState(null);
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [loanAmountCurrency, setLoanAmountCurrency] = useState([]);
    const router = useRouter();
    const [item, setItem] = useState();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        checkAuthorization();
    }, []);

    const checkAuthorization = () => {
        try {
        // var username = localStorage.getItem('userName');
        var access_Token = localStorage.getItem('token');

        console.log('Token ===>', access_Token);

        if (!access_Token) {
            setAuthorized(false);
            router.replace('/auth/login');
        }
        else {
            setAuthorized(true);
            router.replace('/');
            // headersData = localStorage.getItem('userName');
            // token = headersData.access_token;
        }
    } catch (error) {
        console.error(error);
        toast.current.show({ severity: 'error', summary: 'ຜິດພາດ', detail: 'Authorization has been denied' });
        router.push('/auth/login');
    }
    };

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'ຍອດຊຳລະໜີ້',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: '#d90404',
                borderColor: '#d90404',
                tension: 0.4
            },
            {
                label: 'ໜີ້ຈະຕ້ອງຈ່າຍ',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                backgroundColor: '#4979F8',
                borderColor: '#4979F8',
                tension: 0.4
            }
        ]
    };

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        var requestOptions = {
            method: 'GET'
        };
        fetch('https://localhost:44363/api/loan/GetListLoanCurrency', requestOptions)
            .then((response) => response.json())
            .then((result) => setLoanAmountCurrency(result))
            .catch((error) => console.log('error', error));
    }, []);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };
        const options = {
            cutout: '50%'
        };

        setChartData(data);
        setChartOptions(options);
    }, []);
    // useEffect(() => {
    //     const productService = new ProductService();
    //     productService.getProductsSmall().then((data) => setProducts(data));
    // }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    // const formatCurrency = (value) => {
    //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    // };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {});
    };

    const amountcurrencyBody = (rowData) => {
        return formatCurrency(rowData.amount_currency);
    };

    const rateBody = (rowData) => {
        return formatCurrency(rowData.rate);
    };

    const amountkipBody = (rowData) => {
        return formatCurrency(rowData.amount_kip);
    };

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">ໜີ້ກູ້ຢືມໂດຍກົງທັງໝົດ</span>
                            <div className="text-900 font-medium text-xl">2.450.000.000.000 ກີບ</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-dollar text-blue-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">ໜີ້ກູ້ຢືມຕໍ່ທັງໝົດ</span>
                            <div className="text-900 font-medium text-xl">1.050.000.000.000 ກີບ</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-dollar text-orange-500 text-xl" />
                        </div>
                    </div>
                    {/* <span className="text-green-500 font-medium">%52+ </span>
                    <span className="text-500">since last week</span> */}
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">ຈຳນວນໜີ້ກູ້ຢືມຊຳລະແລ້ວທັງໝົດ</span>
                            <div className="text-900 font-medium text-xl text-red-600">- 1.750.000.000.000 ກີບ</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-dollar text-cyan-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">ຍອດຈຳນວນໜີ້ກູ້ຢືມຍັງເຫຼືອທັງໝົດ</span>
                            <div className="text-900 font-medium text-xl text-green-500">1.750.000.000.000 ກີບ</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-dollar text-purple-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>ສະແດງຍອດໜີ້ໃນແຕ່ລະເດືອນ</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card flex justify-content-center">
                    <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-20rem" />
                </div>
            </div>

            <div className="col-12 xl:col-12">
                <div className="card">
                    <h5>ລາຍລະອຽດໜີ້ກູ້ຢືມທັງໝົດ</h5>
                    <DataTable value={loanAmountCurrency} rows={10} paginator responsiveLayout="scroll">
                        <Column field="currency" header="ຊື່ສະກຸນເງິນ" style={{ width: '25%' }} />
                        <Column field="amount_currency" header="ຈຳນວນເງິນກູ້ຢຶມ" style={{ width: '25%' }} body={amountcurrencyBody} />
                        <Column field="rate" header="ອັດຕາແລກປ່ຽນ" style={{ width: '25%' }} body={rateBody} />
                        <Column field="amount_kip" header="ຈຳນວນເງິນ (ກີບ)" style={{ width: '40%' }} body={amountkipBody} />
                    </DataTable>
                    {/* <DataTable
                            dataKey="w_id"
                            value={withdrawList}
                            tableStyle={{ minWidth: '78rem' }}
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                            emptyMessage="No products found."
                            responsiveLayout="scroll"
                            header={header}
                        >
                            <Column field="w_id" header="ລະຫັດ" sortable headerStyle={{ minWidth: '8rem' }}></Column>
                            <Column field="loan_no" header="ເລກທີສັນຍາ" sortable headerStyle={{ minWidth: '10rem' }}></Column>
                            <Column field="project" header="ຊື່ໂຄງການ" sortable headerStyle={{ minWidth: '25rem' }}></Column>
                            <Column field="amount_withdraw" header="ຈຳນວນເງິນຖອນ" sortable headerStyle={{ minWidth: '10rem' }}></Column>
                            <Column field="withdraw_date" header="ວັນທີຖອນ" sortable headerStyle={{ minWidth: '10rem' }}></Column>


                            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        </DataTable> */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
