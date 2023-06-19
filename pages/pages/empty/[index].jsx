import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";


const EmptyPage = () => {
    const route = useRouter();


    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Empty Page</h5>
                    <p>Use this page to start from scratch and place your custom content.</p>
                    <div>your data: {route.query.index}</div>
                </div>
            </div>
        </div>
    );
};

export default EmptyPage;
